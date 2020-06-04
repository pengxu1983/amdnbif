#!/tool/pandora64/bin/tcsh
source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh
set treeRoot=="NA"
set shelve
set resolveopt="-as"
#get all argv
if ($#argv >= 0) then
  while($#argv >0) 
    if($1:q == "--shelve") then
      shift
      set shelve=$1:q
      echo "shelve        : $shelve"
    else if($1:q == "--treeRoot") then
      shift
      set treeRoot=$1:q
      echo "treeRoot      : $treeRoot"
    else if($1:q == "--resolveopt") then
      shift
      set resolveopt=$1:q
      echo "resolveopt    : $resolveopt"
    endif
    shift
  end
  endif
endif
#resolve
if($treeRoot == "NA") then
  set treeRoot=$STEM
endif
cd $treeRoot
bootenv
p4w unshelve -s $shelve
p4w sync_all
p4w resolve $resolveopt
