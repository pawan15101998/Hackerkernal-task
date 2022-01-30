const User = require("./users");
const excelJS = require("exceljs");

const exportUser = async (req, res) => {
  try {

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Users");
    const path = "./files";


    User.find()
    .then( data => {

      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "First Name", key: "name", width: 10 },
        // { header: "Last Name", key: "lname", width: 10 },
        { header: "Email Id", key: "email", width: 10 },
        { header: "Task", key: "tasks", width: 10 },
      ];
    
      let counter = 1;
    
    console.log(data);
      data.forEach((user) =>{
        user.s_no = counter;
        worksheet.addRow(user);
        counter++;
      });
    
    
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
    
  
  
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);
  
      return workbook.xlsx.write(res).then(() => {
        res.status(200);
      });

    }).catch(err => console.log(err))
  
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = exportUser;