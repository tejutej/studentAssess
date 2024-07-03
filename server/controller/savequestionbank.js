const questionbank = require("../model/questionbank"); 

exports.savequestionbankdata = async (results, id, sclass, subject) => {
    console.log(results[0])
    results.forEach(obj => {
        obj.fileid = id;
        obj.classsub = sclass + subject;
        obj.question = "'" + obj.question + "'";
      });

      questionbank.insertMany(results)
  .then((docs) => {
    console.log('Multiple documents inserted to Collection:');
  })
  .catch((err) => {
    console.error('Error inserting documents:', err);
  });
  };