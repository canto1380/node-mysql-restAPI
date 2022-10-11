import { pool } from "../config/dbConnection.js";

export const createDepartament = async (req, res) => {
  try {
    const { departamentName, idBoss } = req.body;
    const [departament] = await pool.query(
      "insert into departament (departamentName, idBoss) values (?, ?)",
      [departamentName, idBoss]
    );
    res.send({
      id: departament.insertId,
      departamentName,
      idBoss,
    });
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const getDepartament = async (req, res) => {
  try {
    const [departament] = await pool.query("select * from departament");
    res.json(departament);
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const getDepartamentById = async (req, res) => {
  try {
    const id = req.params.id;
    const [departament] = await pool.query(
      "select * from departament where idDepartament=?",
      [id]
    );
    if (departament.length === 0) {
      res.json({ Mensaje: "No se encontro un area con el id indicado" });
    } else {
      res.json(departament);
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const searchDepartamentById = async (id) => {
  try {
    const [departament] = await pool.query(
      "select * from departament where idDepartament=?",
      [id]
    );
    if (departament.length === 0) {
      res.json({ Mensaje: "No se encontro un area con el id indicado" });
    } else {
      return departament;
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const updateDepartament = async (req, res) => {
  try {
    // const id = req.params.id
    const { id } = req.params;
    const newDataDepartament = req.body;
    // const {name, salary } = req.body
    const [departament] = await pool.query(
      "update departament set departamentName= ifnull(?, departamentName), idBoss=ifnull(?, idBoss) where idDepartament=?",
      [newDataDepartament.departamentName, newDataDepartament.idBoss, id]
    );
    if (departament.affectedRows <= 0) {
      res.json({ Mensaje: "No se encontro un area con el id indicado" });
    } else {
      const departamentUpdated = await searchDepartamentById(id);
      //TODO: res.status(200).json({ Mensaje: `Empleado con id ${id} actualizado` });
      res.status(200).json(departamentUpdated);
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};

export const getEmployeesFromDepartament = async (id) => {
    const [employes] = await pool.query(
      "select * from employee where idDepartament=?",
      [id]
    );
    if (employes.length !== 0) {
      return false;
    } else {
      return true;
    }
};

export const deleteDepartament = async (req, res) => {
  try {
    const id = req.params.id;
    const verifyDepartamentEmployes = await getEmployeesFromDepartament(id);
    if (verifyDepartamentEmployes === true) {
      const [departament] = await pool.query(
        "delete from departament where idDepartament=?",
        [id]
      );
      if (departament.affectedRows <= 0) {
        res.json({ Mensaje: "No se encontro un area con el id indicado" });
      } else {
        res.status(200).json({ Mensaje: `Area con id ${id} eliminada` });
      }
    } else {
      res
        .status(400)
        .json({
          Mensaje:
            "No se puede eliminar un departamento en el cual hay registrados empleados",
        });
    }
  } catch (error) {
    return res.status(500).json({ Mensaje: "Algo salio mal" });
  }
};
