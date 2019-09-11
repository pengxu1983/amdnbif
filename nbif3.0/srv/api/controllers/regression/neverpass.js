var moment        = require('moment');
module.exports = {


  friendlyName: 'Neverpass',


  description: 'Neverpass regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    groupname : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/neverpass');
    sails.log(inputs);
    //////////////////////////
    //GET 
    //////////////////////////
    if(inputs.kind  ==  'getall'){
      if(inputs.projectname ==  'mi200'){
        let R = await Regressionneverpass0001.find({
          id  : {'>=':0}
        });
        return exits.success(JSON.stringify({
          ok  : 'ok',
          neverpasscases  : JSON.stringify(R)
        }));
      }
    }
    //////////////////////////
    //calculate
    //////////////////////////
    if(inputs.kind  ==  'cal'){
      let R;
      let notpasscases;
      let lastneverpass;
      let newneverpass=[];
      //////////////////////////
      //For 0001
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        sails.log('mi200');
        notpasscases = await Regressiondetails0001.find({
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          result      : {'!=':'PASS'}
        });
        sails.log('length : '+notpasscases.length);
        if(notpasscases.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no cases'
          }));
        }
        else{
          for(let t=0;t<notpasscases.length;t++){
            lastneverpass = await Regressionneverpass0001.findOne({
              testname    : notpasscases[t].testname,
              projectname : notpasscases[t].projectname,
              variantname : notpasscases[t].variantname,
              isBAPU      : notpasscases[t].isBAPU,
              suite       : notpasscases[t].suite,
            });
            sails.log('dbg1');
            sails.log(lastneverpass);
            if(lastneverpass){
              newneverpass.push({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
                lastfail    : notpasscases[t].changelist,
                groupname   : notpasscases[t].groupname,
                fixETA      : lastneverpass.fixETA,
                owner       : lastneverpass.owner,
              });
            }
            else{
              R = await Regressiondetails0001.find({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
              });
              sails.log('dbg2');
              sails.log(R);
              if(R.length == 0){
                newneverpass.push({
                  testname    : notpasscases[t].testname,
                  projectname : notpasscases[t].projectname,
                  variantname : notpasscases[t].variantname,
                  isBAPU      : notpasscases[t].isBAPU,
                  suite       : notpasscases[t].suite,
                  lastfail    : notpasscases[t].changelist,
                  groupname   : notpasscases[t].groupname,
                  fixETA      : '',
                  owner       : '',
                });
              }
              else{
                let flag = 1;//to record
                for(let i=0;i<R.length;i++){
                  if(R[i].result  ==  'PASS'){
                    flag = 0;
                    break;
                  }
                }
                if(flag == 1){
                  newneverpass.push({
                    testname    : notpasscases[t].testname,
                    projectname : notpasscases[t].projectname,
                    variantname : notpasscases[t].variantname,
                    isBAPU      : notpasscases[t].isBAPU,
                    suite       : notpasscases[t].suite,
                    lastfail    : notpasscases[t].changelist,
                    groupname   : notpasscases[t].groupname,
                    fixETA      : '',
                    owner       : '',
                  });
                }
              }
            }
          }
          await Regressionneverpass0001.destroy({
            id  : {'>=':0}
          });
          sails.log('dbg3');
          sails.log(newneverpass.length);
          await Regressionneverpass0001.createEach(newneverpass);
          newneverpass=[];
        }
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
      //////////////////////////
      //For 0002
      //////////////////////////
      if(inputs.projectname ==  'mero'){
        notpasscases = await Regressiondetails0002.find({
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          result      : {'!=':'PASS'}
        });
        if(notpasscases.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no cases'
          }));
        }
        else{
          for(let t=0;t<notpasscases.length;t++){
            lastneverpass = await Regressionneverpass0002.findOne({
              testname    : notpasscases[t].testname,
              projectname : notpasscases[t].projectname,
              variantname : notpasscases[t].variantname,
              isBAPU      : notpasscases[t].isBAPU,
              suite       : notpasscases[t].suite,
            });
            if(lastneverpass){
              newneverpass.push({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
                lastfail    : notpasscases[t].changelist,
                fixETA      : lastneverpass.fixETA,
                owner       : lastneverpass.owner,
              });
            }
            else{
              R = await Regressiondetails0002.find({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
              });
              if(R.length == 0){
                newneverpass.push({
                  testname    : notpasscases[t].testname,
                  projectname : notpasscases[t].projectname,
                  variantname : notpasscases[t].variantname,
                  isBAPU      : notpasscases[t].isBAPU,
                  suite       : notpasscases[t].suite,
                  lastfail    : notpasscases[t].changelist,
                  fixETA      : '',
                  owner       : '',
                });
              }
              else{
                let flag = 1;//to record
                for(let i=0;i<R.length;i++){
                  if(R[i].result  ==  'PASS'){
                    flag = 0;
                    break;
                  }
                }
                if(flag == 1){
                  newneverpass.push({
                    testname    : notpasscases[t].testname,
                    projectname : notpasscases[t].projectname,
                    variantname : notpasscases[t].variantname,
                    isBAPU      : notpasscases[t].isBAPU,
                    suite       : notpasscases[t].suite,
                    lastfail    : notpasscases[t].changelist,
                    fixETA      : '',
                    owner       : '',
                  });
                }
              }
            }
          }
          await Regressionneverpass0002.destroy({
            id  : {'>=':0}
          });
          await Regressionneverpass0002.createEach(newneverpass);
          newneverpass=[];
        }
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
      //////////////////////////
      //For 0003
      //////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        notpasscases = await Regressiondetails0003.find({
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          result      : {'!=':'PASS'}
        });
        if(notpasscases.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no cases'
          }));
        }
        else{
          for(let t=0;t<notpasscases.length;t++){
            lastneverpass = await Regressionneverpass0003.findOne({
              testname    : notpasscases[t].testname,
              projectname : notpasscases[t].projectname,
              variantname : notpasscases[t].variantname,
              isBAPU      : notpasscases[t].isBAPU,
              suite       : notpasscases[t].suite,
            });
            if(lastneverpass){
              newneverpass.push({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
                lastfail    : notpasscases[t].changelist,
                fixETA      : lastneverpass.fixETA,
                owner       : lastneverpass.owner,
              });
            }
            else{
              R = await Regressiondetails0003.find({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
              });
              if(R.length == 0){
                newneverpass.push({
                  testname    : notpasscases[t].testname,
                  projectname : notpasscases[t].projectname,
                  variantname : notpasscases[t].variantname,
                  isBAPU      : notpasscases[t].isBAPU,
                  suite       : notpasscases[t].suite,
                  lastfail    : notpasscases[t].changelist,
                  fixETA      : '',
                  owner       : '',
                });
              }
              else{
                let flag = 1;//to record
                for(let i=0;i<R.length;i++){
                  if(R[i].result  ==  'PASS'){
                    flag = 0;
                    break;
                  }
                }
                if(flag == 1){
                  newneverpass.push({
                    testname    : notpasscases[t].testname,
                    projectname : notpasscases[t].projectname,
                    variantname : notpasscases[t].variantname,
                    isBAPU      : notpasscases[t].isBAPU,
                    suite       : notpasscases[t].suite,
                    lastfail    : notpasscases[t].changelist,
                    fixETA      : '',
                    owner       : '',
                  });
                }
              }
            }
          }
          await Regressionneverpass0003.destroy({
            id  : {'>=':0}
          });
          await Regressionneverpass0003.createEach(newneverpass);
          newneverpass=[];
        }
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
      //////////////////////////
      //For 0004
      //////////////////////////
      if(inputs.projectname ==  'floyd'){
        notpasscases = await Regressiondetails0004.find({
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          result      : {'!=':'PASS'}
        });
        if(notpasscases.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no cases'
          }));
        }
        else{
          for(let t=0;t<notpasscases.length;t++){
            lastneverpass = await Regressionneverpass0004.findOne({
              testname    : notpasscases[t].testname,
              projectname : notpasscases[t].projectname,
              variantname : notpasscases[t].variantname,
              isBAPU      : notpasscases[t].isBAPU,
              suite       : notpasscases[t].suite,
            });
            if(lastneverpass){
              newneverpass.push({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
                lastfail    : notpasscases[t].changelist,
                fixETA      : lastneverpass.fixETA,
                owner       : lastneverpass.owner,
              });
            }
            else{
              R = await Regressiondetails0004.find({
                testname    : notpasscases[t].testname,
                projectname : notpasscases[t].projectname,
                variantname : notpasscases[t].variantname,
                isBAPU      : notpasscases[t].isBAPU,
                suite       : notpasscases[t].suite,
              });
              if(R.length == 0){
                newneverpass.push({
                  testname    : notpasscases[t].testname,
                  projectname : notpasscases[t].projectname,
                  variantname : notpasscases[t].variantname,
                  isBAPU      : notpasscases[t].isBAPU,
                  suite       : notpasscases[t].suite,
                  lastfail    : notpasscases[t].changelist,
                  fixETA      : '',
                  owner       : '',
                });
              }
              else{
                let flag = 1;//to record
                for(let i=0;i<R.length;i++){
                  if(R[i].result  ==  'PASS'){
                    flag = 0;
                    break;
                  }
                }
                if(flag == 1){
                  newneverpass.push({
                    testname    : notpasscases[t].testname,
                    projectname : notpasscases[t].projectname,
                    variantname : notpasscases[t].variantname,
                    isBAPU      : notpasscases[t].isBAPU,
                    suite       : notpasscases[t].suite,
                    lastfail    : notpasscases[t].changelist,
                    fixETA      : '',
                    owner       : '',
                  });
                }
              }
            }
          }
          await Regressionneverpass0004.destroy({
            id  : {'>=':0}
          });
          await Regressionneverpass0004.createEach(newneverpass);
          newneverpass=[];
        }
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
