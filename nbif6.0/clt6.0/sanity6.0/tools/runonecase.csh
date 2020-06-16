#!/tool/pandora64/bin/tcsh
source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh
set variantname="nbif_et_0"
set out_anchor="NA"
set suite="nbiftdl"
set config="nbif_all_rtl"
set seed=12345678
set tasktype="test"
set UVM_VERBOSITY="UVM_LOW"
set runopt="all"
set treeRoot="NA"
set casename="demo_test_0"
set isBAPU="no"
#get all argv
if ($#argv >= 0) then
  while($#argv >0) 
    if($1:q == "--variantname") then
      shift
      set variantname=$1:q
      echo "variantname   : $variantname"
    else if($1:q == "--casename") then
      shift
      set casename=$1:q
      echo "casename      : $casename"
    else if($1:q == "--seed") then
      shift
      set seed=$1:q
      echo "seed          : $seed"
    else if($1:q == "--out_anchor") then
      shift
      set out_anchor=$1:q
      echo "out_anchor    : $out_anchor"
    else if($1:q == "--suite") then
      shift
      set suite=$1:q
      echo "suite         : $suite"
    else if($1:q == "--config") then
      shift
      set config=$1:q
      echo "config        : $config"
    else if($1:q == "--tasktype") then
      shift
      set tasktype=$1:q
      echo "tasktype      : $tasktype"
    else if($1:q == "--UVM_VERBOSITY") then
      shift
      set UVM_VERBOSITY=$1:q
      echo "UVM_VERBOSITY : $UVM_VERBOSITY"
    else if($1:q == "--runopt") then
      shift
      set runopt=$1:q
      echo "runopt        : $runopt"
    else if($1:q == "--treeRoot") then
      shift
      set treeRoot=$1:q
      echo "treeRoot      : $treeRoot"
    endif
    shift
  end
  endif
endif
#run case
bootenv
if($out_anchor  ==  "NA") then
  set out_anchor= $STEM
endif
if($treeRoot  ==  "NA") then
  set treeRoot= $STEM
endif
cd $treeRoot
bootenv -v $variantname -out_anchor  $out_anchor
if($tasktype  ==  "test") then
  if($runopt  ==  "all")  then
    dj -q -l $STEM/nb__.$variantname.$tasktype.$casename.log -DUVM_VERBOSITY=$UVM_VERBOSITY -m4 -DUSE_VRQ -DCGM -DSEED=$seed  run_test -s ${suite} $casename\_${config}
  endif
  if($runopt  ==  "compileonly")  then
    dj -q -l $STEM/nb__.$variantname.$tasktype.$casename.log -DUVM_VERBOSITY=$UVM_VERBOSITY -m4 -DUSE_VRQ -DCGM -DSEED=$seed  run_test -s ${suite} $casename\_${config} -a execute=off
  endif
  if($runopt  ==  "runonly")  then
    dj -q -l $STEM/nb__.$variantname.$tasktype.$casename.log -DUVM_VERBOSITY=$UVM_VERBOSITY -m4 -DUSE_VRQ -DCGM -DSEED=$seed  run_test -s ${suite} $casename\_${config} -a run=only
  endif
else if($tasktype ==  "task") then
  if($casename  ==  "dcelab") then
    if($variantname  ==  "nbif_draco_gpu") then
      dj -q -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_algfx
    endif
    if($variantname  ==  "nbif_nv10_gpu") then
      dj -q -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_gfx
    endif
    if($variantname  ==  "nbif_et_0") then
      dj -q -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_0
    endif
    if($variantname  ==  "nbif_et_1") then
      dj -q -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_1
    endif
    if($variantname  ==  "nbif_et_2") then
      dj -q -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_2
    endif
  endif
endif
