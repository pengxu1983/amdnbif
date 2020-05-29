#!/tool/pandora64/bin/tcsh -f
source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh
set variantname
set out_anchor="NA"
set suite="nbiftdl"
set config="nbif_all_rtl"
set seed=12345678
#get all argv
if ($#argv >= 0) then
  while($#argv >0) 
    if(($1:q == "--variantname")) then
      shift
      set variantname=$1:q
      echo "variantname:"
      echo $variantname
    else if(($1:q == "--testname")) then
      shift
      set testname=$1:q
      echo "testname:"
      echo $testname
    else if(($1:q == "--seed")) then
      shift
      set seed=$1:q
      echo "seed:"
      echo $seed
    else if(($1:q == "--out_anchor")) then
      shift
      set out_anchor=$1:q
      echo "out_anchor:"
      echo $out_anchor
    else if(($1:q == "--suite")) then
      shift
      set suite=$1:q
      echo "suite:"
      echo $suite
    else if(($1:q == "--config")) then
      shift
      set config=$1:q
      echo "config:"
      echo $config
    endif
    shift
  end
  endif
endif
