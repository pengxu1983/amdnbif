var moment          = require('moment');
module.exports = {


  friendlyName: 'Vacation',


  description: 'Vacation users.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    vacationname  : {
      type  : 'string'
    },
    username  : {
      type  : 'string'
    },
    begin   : {
      type  : 'string'
    },
    end     : {
      type  : 'string'
    },
    cellphone : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/users/vacation');
    sails.log(inputs);
    if(inputs.kind  = 'get'){
      let users = await Users.find({
        team  : 'nbif'
      });
      let vacations = [];
      for(let u=0;u<users.length;u++){
        
        let R = await Vacations.findOne({
          username  : users[u].username,
          vacationname  : inputs.vacationname,
          year      : moment().format('YYYY')
        });
        if(R){
          vacations[u]={
            username  : users[u].username,
            realname  : users[u].realname,
            email     : users[u].email,
            begin     : R.begin,
            end       : R.end,
            cellphone : R.cellphone
          };
        }
        else{
          vacations[u]={
            username  : users[u].username,
            realname  : users[u].realname,
            email     : users[u].email,
            begin     : '',
            end       : '',
            cellphone : ''
          };
        }
      }
      // All done.
      return exits.success(JSON.stringify({
        ok  : 'ok',
        vacations : JSON.stringify(vacations)
      }));
    }
    if(inputs.kind  =='update'){
      let R = await Vacations.findOne({
        username  : inputs.username,
        vacationname  : inputs.vacationname,
        year          : moment().format('YYYY')
      });
      if(R){
        await Vacations.update({
          username  : inputs.username,
          vacationname  : inputs.vacationname,
          year          : moment().format('YYYY')
        },{
          begin     : inputs.begin,
          end       : inputs.end,
          cellphone : inputs.cellphone,
        });
      }
      else{
        await Vacations.create({
          username  : inputs.username,
          vacationname  : inputs.vacationname,
          year          : moment().format('YYYY'),
          begin     : inputs.begin,
          end       : inputs.end,
          cellphone : inputs.cellphone,
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
      }));
    }

  }


};
