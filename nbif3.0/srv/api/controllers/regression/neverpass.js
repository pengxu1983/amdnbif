var moment        = require('moment');
module.exports = {


  friendlyName: 'Neverpass',


  description: 'Neverpass regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    testname  : {
      type  : 'string'
    },
    fixETA    : {
      type  : 'string'
    },
    commitfix : {
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
    //commitone start
    //////////////////////////
    if(inputs.kind == 'commitone'){
      let R;
      let msg = '';
      let W = {
        testname    : inputs.testname,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU
      };
      D1  = {
        commitfix : inputs.commitfix
      };
      D2  = {
        fixETA    : inputs.fixETA
      };
      //////////////////////////
      //For 0001 start
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        R = await Regressionneverpass0001.findOne(W);
      }
      //////////////////////////
      //For 0001 end
      //////////////////////////
      //////////////////////////
      //For 0002 start
      //////////////////////////
      if(inputs.projectname ==  'mero'){
        R = await Regressionneverpass0002.findOne(W);
      }
      //////////////////////////
      //For 0002 end
      //////////////////////////
      //////////////////////////
      //For 0003 start
      //////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        R = await Regressionneverpass0003.findOne(W);
      }
      //////////////////////////
      //For 0003 end
      //////////////////////////
      //////////////////////////
      //For 0004 start
      //////////////////////////
      if(inputs.projectname ==  'floyd'){
        R = await Regressionneverpass0004.findOne(W);
      }
      //////////////////////////
      //For 0004 end
      //////////////////////////
      //sails.log('px');
      //sails.log(R);
      if(R.commitfix){
        msg += 'commitfix ignored;';
      }
      else{
        //////////////////////////
        //For 0001 start
        //////////////////////////
        if(inputs.projectname ==  'mi200'){
          await Regressionneverpass0001.update(W,D1);
        }
        //////////////////////////
        //For 0001 end
        //////////////////////////
        //////////////////////////
        //For 0002 start
        //////////////////////////
        if(inputs.projectname ==  'mero'){
          await Regressionneverpass0002.update(W,D1);
        }
        //////////////////////////
        //For 0002 end
        //////////////////////////
        //////////////////////////
        //For 0003 start
        //////////////////////////
        if(inputs.projectname ==  'rembrandt'){
          await Regressionneverpass0003.update(W,D1);
        }
        //////////////////////////
        //For 0003 end
        //////////////////////////
        //////////////////////////
        //For 0004 start
        //////////////////////////
        if(inputs.projectname ==  'floyd'){
          await Regressionneverpass0004.update(W,D1);
        }
        //////////////////////////
        //For 0004 end
        //////////////////////////
        msg += 'commitfix uploaded;';
      }
      if(R.fixETA){
        msg += 'fixETA ignored';
      }
      else{
        //////////////////////////
        //For 0001 start
        //////////////////////////
        if(inputs.projectname ==  'mi200'){
          await Regressionneverpass0001.update(W,D2);
        }
        //////////////////////////
        //For 0001 end
        //////////////////////////
        //////////////////////////
        //For 0002 start
        //////////////////////////
        if(inputs.projectname ==  'mero'){
          await Regressionneverpass0002.update(W,D2);
        }
        //////////////////////////
        //For 0002 end
        //////////////////////////
        //////////////////////////
        //For 0003 start
        //////////////////////////
        if(inputs.projectname ==  'rembrandt'){
          await Regressionneverpass0003.update(W,D2);
        }
        //////////////////////////
        //For 0003 end
        //////////////////////////
        //////////////////////////
        //For 0004 start
        //////////////////////////
        if(inputs.projectname ==  'floyd'){
          await Regressionneverpass0004.update(W,D2);
        }
        //////////////////////////
        //For 0004 end
        //////////////////////////
        msg += 'fixETA uploaded';
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : msg
      }));
    }
    //////////////////////////
    //commitone end
    //////////////////////////

    //////////////////////////
    //getonegroup start
    //////////////////////////
    if(inputs.kind  ==  'getonegroup'){
      let R;
      let W={
        groupname   : inputs.groupname,
        projectname : inputs.projectname,
        isBAPU      : inputs.isBAPU
      };
      //////////////////////////
      //For 0001 start
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        R = await Regressionneverpass0001.find(W);
      }
      //////////////////////////
      //For 0001 end
      //////////////////////////
      //////////////////////////
      //For 0002 start
      //////////////////////////
      if(inputs.projectname ==  'mero'){
        R = await Regressionneverpass0002.find(W);
      }
      //////////////////////////
      //For 0002 end
      //////////////////////////
      //////////////////////////
      //For 0003 start
      //////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        R = await Regressionneverpass0003.find(W);
      }
      //////////////////////////
      //For 0003 end
      //////////////////////////
      //////////////////////////
      //For 0004 start
      //////////////////////////
      if(inputs.projectname ==  'floyd'){
        R = await Regressionneverpass0004.find(W);
      }
      //////////////////////////
      //For 0004 end
      //////////////////////////
      return exits.success(JSON.stringify({
        ok  : 'ok',
        neverpasscases  : JSON.stringify(R)
      }));
    }
    //////////////////////////
    //getonegroup end
    //////////////////////////
    //////////////////////////
    //getall start
    //////////////////////////
    if(inputs.kind  ==  'getall'){
      let R;
      let W={
        id  : {'>=':0}
      };
      
      //////////////////////////
      //For 0001 start
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        R = await Regressionneverpass0001.find(W);
      }
      //////////////////////////
      //For 0001 end
      //////////////////////////
      //////////////////////////
      //For 0002 start
      //////////////////////////
      if(inputs.projectname ==  'mero'){
        R = await Regressionneverpass0002.find(W);
      }
      //////////////////////////
      //For 0002 end
      //////////////////////////
      //////////////////////////
      //For 0003 start
      //////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        R = await Regressionneverpass0003.find(W);
      }
      //////////////////////////
      //For 0003 end
      //////////////////////////
      //////////////////////////
      //For 0004 start
      //////////////////////////
      if(inputs.projectname ==  'floyd'){
        R = await Regressionneverpass0004.find(W);
      }
      //////////////////////////
      //For 0004 end
      //////////////////////////
      return exits.success(JSON.stringify({
        ok  : 'ok',
        neverpasscases  : JSON.stringify(R)
      }));
    }
    //////////////////////////
    //getall end
    //////////////////////////
    //////////////////////////
    //calculate start
    //////////////////////////
    if(inputs.kind  ==  'cal'){
      let R;
      let notpasscases;
      let lastneverpass;
      let newneverpass=[];
      let W = {
        kickoffdate : inputs.kickoffdate,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU,
        result      : {'!=':'PASS'}
      }
      //////////////////////////
      //For 0001 start
      //////////////////////////
      if(inputs.projectname ==  'mi200'){
        notpasscases = await Regressiondetails0001.find(W);
      }
      //////////////////////////
      //For 0001 end
      //////////////////////////
      //////////////////////////
      //For 0002 start
      //////////////////////////
      if(inputs.projectname ==  'mero'){
        notpasscases = await Regressiondetails0002.find(W);
      }
      //////////////////////////
      //For 0002 end
      //////////////////////////
      //////////////////////////
      //For 0003 start
      //////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        notpasscases = await Regressiondetails0003.find(W);
      }
      //////////////////////////
      //For 0003 end
      //////////////////////////
      //////////////////////////
      //For 0004 start
      //////////////////////////
      if(inputs.projectname ==  'floyd'){
        notpasscases = await Regressiondetails0004.find(W);
      }
      //////////////////////////
      //For 0004 end
      //////////////////////////
      //sails.log('length : '+notpasscases.length);
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
          //sails.log('groupinfo');
          //sails.log(groupinfo.owner);
          lastneverpass = await Regressionneverpass0001.findOne({
            testname    : notpasscases[t].testname,
            projectname : notpasscases[t].projectname,
            variantname : notpasscases[t].variantname,
            isBAPU      : notpasscases[t].isBAPU,
            suite       : notpasscases[t].suite,
          });
          //sails.log('dbg1');
          //sails.log(lastneverpass);
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
            //sails.log('dbg2');
            //sails.log(R);
            
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
        //For 0001 start
        //////////////////////////
        if(inputs.projectname == 'mi200'){
          await Regressionneverpass0001.destroy({
            isBAPU  : inputs.isBAPU
          });
          //sails.log('dbg3');
          //sails.log(newneverpass.length);
          await Regressionneverpass0001.createEach(newneverpass);
        }
        //////////////////////////
        //For 0001 end
        //////////////////////////
        //////////////////////////
        //For 0002 start
        //////////////////////////
        if(inputs.projectname == 'mero'){
          await Regressionneverpass0002.destroy({
            isBAPU  : inputs.isBAPU
          });
          //sails.log('dbg3');
          //sails.log(newneverpass.length);
          await Regressionneverpass0002.createEach(newneverpass);
        }
        //////////////////////////
        //For 0002 end
        //////////////////////////
        //////////////////////////
        //For 0003 start
        //////////////////////////
        if(inputs.projectname == 'rembrandt'){
          await Regressionneverpass0003.destroy({
            isBAPU  : inputs.isBAPU
          });
          //sails.log('dbg3');
          //sails.log(newneverpass.length);
          await Regressionneverpass0003.createEach(newneverpass);
        }
        //////////////////////////
        //For 0003 end
        //////////////////////////
        //////////////////////////
        //For 0004 start
        //////////////////////////
        if(inputs.projectname == 'floyd'){
          await Regressionneverpass0004.destroy({
            isBAPU  : inputs.isBAPU
          });
          //sails.log('dbg3');
          //sails.log(newneverpass.length);
          await Regressionneverpass0004.createEach(newneverpass);
        }
        //////////////////////////
        //For 0004 end
        //////////////////////////
        newneverpass=[];
      }
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    //////////////////////////
    //calculate end
    //////////////////////////

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
