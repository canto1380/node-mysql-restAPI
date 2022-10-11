import { pool } from "../config/dbConnection.js";

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = req.body;
    const { name, surname, salary, idDepartament } = req.body;
    const [employee] = await pool.query(
      "insert into employee (name, surname, salary, idDepartament) values (?,?,?,?)",
      [name, surname, salary, idDepartament]
    );
    res.send({
      id: employee.insertId,
      newEmployee,
    });
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};
//FIXME: Prueba de la extension TODO Highlight
//TODO: Prueba
export const getEmployes = async (req, res) => {
  try {
    const [employee] = await pool.query("select * from employee");
    res.json(employee);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
    //TODO: throw new Error('Nuevo error creado') Forma de crear un error propio
  }
};

export const getEmployeById = async (req, res) => {
  try {
    const id = req.params.id;
    const [employee] = await pool.query(
      "select * from employee where idEmployee=?",
      [id]
    );
    if (employee.length === 0) {
      res.json({ Mensaje: "No se encontro un empleado con el id indicado" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};
export const searchEmployeeById = async (id) => {
  try {
    const [employee] = await pool.query(
      "select * from employee where idEmployee=?",
      [id]
    );
    if (employee.length === 0) {
      res.json({ Mensaje: "No se encontro un empleado con el id indicado" });
    } else {
      return employee;
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const updateEmplyee = async (req, res) => {
  try {
    // const id = req.params.id
    const { id } = req.params;
    const newDataEmployee = req.body;
    // const {name, salary } = req.body
    const [employee] = await pool.query(
      "update employee set name= ifnull(?, name), surname= ifnull(?, surname), salary=ifnull(?, salary), idDepartament= ifnull(?, idDepartament) where idEmployee=?",
      [newDataEmployee.name, newDataEmployee.surname, newDataEmployee.salary, newDataEmployee.idDepartament, id]
    );
    console.log(id)
    if (employee.affectedRows <= 0) {
      res.json({ Mensaje: "No se encontro un empleado con el id indicado" });
    } else {
      const employeeUpdated = await searchEmployeeById(id);
      //TODO: res.status(200).json({ Mensaje: `Empleado con id ${id} actualizado` });
      res.status(200).json(employeeUpdated);
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const deleteEmplyee = async (req, res) => {
  try {
    const id = req.params.id;
    const [employee] = await pool.query("delete from employee where idEmployee=?", [
      id,
    ]);
    if (employee.affectedRows <= 0) {
      res.json({ Mensaje: "No se encontro un empleado con el id indicado" });
    } else {
      res.status(200).json({ Mensaje: `Empleado con id ${id} eliminado` });
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};
