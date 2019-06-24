#!/tool/pandora64/.package/perl-5.24.0/bin/perl -w


my $vcs_run__log = shift @ARGV;
#print $vcs_run__log,"\n";
open(FH,"<$vcs_run__log");
my @lines = <FH>;
my $seed ="NA";
my $signature ="NA";
my $result = "UNKNOWN";
foreach my $line (@lines){
  chomp $line;
  if($line =~ m/\+seed=(\d+)/){
    $seed = $1;
  }
  if($line =~ /^error/i){
    $result = 'FAIL';
    $signature  = $line;
    last;
  }
  if($line =~ /^UVM_ERROR/){
    if($line =~ /^UVM_ERROR\s+:\s+\d+/){
      #ignore
    }
    else{
      $result = 'FAIL';
      $signature  = $line;
    }
    last;
  }
  if($line =~ /^UVM_FATAL/){
    if($line =~ /^UVM_FATAL\s+:\s+\d+/){
      #ignore
    }
    else{
      $result = 'FAIL';
      $signature  = $line;
    }
    last;
  }
}
print "$seed\n$result\n$signature";
close(FH);
