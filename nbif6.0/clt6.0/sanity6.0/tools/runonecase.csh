#!/tool/pandora64/bin/tcsh -f
source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh
set variantname   ="nbif_et_0"
set out_anchor    ="NA"
set suite         ="nbiftdl"
set config        ="nbif_all_rtl"
set seed          =12345678
set tasktype      ="test"
set UVM_VERBOSITY ="UVM_LOW"
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
      set $UVM_VERBOSITY=$1:q
      echo "UVM_VERBOSITY : $UVM_VERBOSITY"
    endif
    shift
  end
  endif
endif
#run case
if($out_anchor  ==  "NA") then
  bootenv
  set out_anchor  = "$STEM"
endif
bootenv -v $variantname -out_anchor  $out_anchor
if($tasktype  ==  "test") then
  dj -q -l $STEM/nb__.$variantname.$tasktype.$casename.log -DUVM_VERBOSITY=$UVM_VERBOSITY -m4 -DUSE_VRQ -DCGM -DSEED=$seed  run_test -s ${suite} $casename\_${config}
else if($tasktype ==  "task") then
  if($casename  ==  "dcelab") then
    if($variantname  ==  "nbif_draco_gpu") then
      dj -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_algfx
    endif
    if($variantname  ==  "nbif_nv10_gpu") then
      dj -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_gfx
    endif
    if($variantname  ==  "nbif_et_0") then
      dj -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_0
    endif
    if($variantname  ==  "nbif_et_1") then
      dj -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_1
    endif
    if($variantname  ==  "nbif_et_2") then
      dj -v -l $STEM/nb__.$variantname.$tasktype.$casename.log -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_2
    endif
  endif
endif
