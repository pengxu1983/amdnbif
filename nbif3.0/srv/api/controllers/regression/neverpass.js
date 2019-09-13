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
      //For 0001 start
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        notpasscases = await Regressiondetails0001.find({
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          result      : {'!=':'PASS'}
        });
      }
      //////////////////////////
      //For 0001 end
      //////////////////////////
      sails.log('length : '+notpasscases.length);
      if(notpasscases.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no cases'
        }));
      }
      else{
        for(let t=0;t<notpasscases.length;t++){
          let groupinfo = await Groups.findOne({
            groupname   : notpasscases[t].groupname,
            projectname : notpasscases[t].projectname,
            variantname : notpasscases[t].variantname,
            isBAPU      : notpasscases[t].isBAPU
          });
          sails.log('groupinfo');
          sails.log(groupinfo);
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
              commitfix   : lastneverpass.commitfix,
              owner       : groupinfo.owner,
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
                commitfix   : '',
                owner       : groupinfo.owner,
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
                  commitfix   : '',
                  owner       : groupinfo.owner,
                });
              }
            }
          }
        }
        //////////////////////////
        //For 0001
        //////////////////////////
        if(inputs.projectname == 'mi200'){
          await Regressionneverpass0001.destroy({
            isBAPU  : inputs.isBAPU
          });
          sails.log('dbg3');
          sails.log(newneverpass.length);
          await Regressionneverpass0001.createEach(newneverpass);
        }
        //////////////////////////
        //For 0001 end
        //////////////////////////
        newneverpass=[];
      }
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));

      //////////////////////////
      //For 0002
      //////////////////////////
      //////////////////////////
      //For 0003
      //////////////////////////
      //////////////////////////
      //For 0004
      //////////////////////////
    }

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
