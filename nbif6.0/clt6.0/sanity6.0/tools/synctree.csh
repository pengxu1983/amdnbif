#!/tool/pandora64/bin/tcsh
source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh
set variantname="nbif_et_0"
set out_anchor="NA"
set suite="nbiftdl"
set config="nbif_all_rtl"
set seed="12345678"
set tasktype="test"
set UVM_VERBOSITY="UVM_LOW"
set codeline="nbif2_0"
set branch_name="nbif2_0_main"
set changelist=""
set treeRoot=`pwd`
#get all argv
if ($#argv >= 0) then
  while($#argv >0) 
    if($1:q == "--codeline") then
      shift
      set codeline=$1:q
      echo "codeline      : $codeline"
    else if($1:q == "--branch_name") then
      shift
      set branch_name=$1:q
      echo "branch_name   : $branch_name"
    else if($1:q == "--changelist") then
      shift
      set changelist=$1:q
      echo "changelist    : $changelist"
    else if($1:q == "--treeRoot") then
      shift
      set treeRoot=$1:q
      echo "treeRoot      : $treeRoot"
    endif
    shift
  end
  endif
endif
#sync tree
cd $treeRoot
if($changelist  ==  "") then
  p4_mkwa -codeline $codeline -branch_name $branch_name
else
  p4_mkwa -codeline $codeline -branch_name $branch_name -cl $changelist
endif
