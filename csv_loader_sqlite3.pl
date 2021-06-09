use 5.26.0;
use Text::CSV;
use DBI;
use FileHandle;
STDOUT->autoflush();

my $db_name = "salaries.sqlite3";
my $csv_name = "public-salaries.csv";

say "Reading from $csv_name and inserting into $db_name table 'salaries'...";

my $dbh = DBI->connect("dbi:SQLite:dbname=$db_name","","");
$dbh->do("drop table IF EXISTS salaries") or die $!;
$dbh->do("
CREATE TABLE salaries(
  agency TEXT,
  employee TEXT,
  job_title TEXT,
  total_annual_amount REAL,
  original_hire_date TEXT
)") or die $!;
my $sth = $dbh->prepare("
  insert into salaries (agency, employee, job_title, total_annual_amount, original_hire_date)
  values (?, ?, ?, ?, ?)
");

my $csv = Text::CSV->new ({ binary => 1, auto_diag => 1 });
open my $fh, "<:encoding(utf8)", $csv_name or die $!;
my $inserted_cnt;
for (1..5) { $csv->getline($fh) }     # skip headers
while (my $row = $csv->getline($fh)) {
  $row->[3] =~ s/["\$,]//g;
  my ($m, $d, $y) = split m#/#, $row->[4];
  if ($y < 50) {
    $y = sprintf("20%02d", $y);
  } else {
    $y = sprintf("19%02d", $y);
  }
  my $date = sprintf("%04d-%02d-%02d", $y, $m, $d);
  $sth->execute(
    $row->[0],
    $row->[1],
    $row->[2],
    $row->[3],
    $date
  );
  print ".";
  $inserted_cnt++;
}
close $fh;
$sth->finish or die $!;
$dbh->disconnect or die $!;

print "\nInserted $inserted_cnt rows into 'salaries' table of $db_name\n";

