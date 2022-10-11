import { pool } from "../config/dbConnection.js";

export const createBoss = async(req, res) => {
  try {
    const {name, surname} = req.body
    const [boss] = await pool.query(
      'insert into boss (name, surname) values (?,?)', [name, surname]
    )
    res.send({
      id: boss.insertId,
      name,
      surname
    })
  } catch (error) {
    res.status(500).json({Mensaje: 'Algo salio mal'})
  }
}

export const getBoss = async(req, res) => {
  try {
    const [boss] = await pool.query('select * from boss')
    res.json(boss)
  } catch (error) {
    res.status(500).json({Mensaje: 'Algo salio mal'})
  }
}

export const getBossById = async(req, res) => {
  try {
    const id = req.params.id
    const [boss] = await pool.query('select * from boss where idBoss=?', [id])
    if(boss.length === 0) {
      res.status(200).json({Mensaje: 'No se encontro un superior con el id indicado'})
    } else {
      res.status(200).json(boss)
    }
  } catch (error) {
    res.status(500).json({Mensaje: 'Algo salio mal'})
  }
}

export const searchBossById = async(id) => {
  try {
    const [boss] = await pool.query('select * from boss where idBoss=?', [id])
    if(boss.length === 0) {
      return false
    } else {
      return boss
    }
  } catch (error) {
    return error
  }
}

export const updateBoss = async(req, res) => {
  try {
    const {id} = req.params
    const {name, surname} = req.body
    const [boss] = await pool.query(
      'update boss set name= ifnull(?, name), surname= ifnull(?, surname) where idBoss=?',
      [name, surname, id]
    )
    if(boss.affectedRows <= 0) {
      res.status(200).json({Mensaje: 'No se encontro un superior con el id indicado'})
    } else {
      const bossUpdated = await searchBossById(id)
      res.status(200).json(bossUpdated)
    }
  } catch (error) {
    res.status(500).json({Mensaje: 'Algo salio mal'})
  }
}

export const getDepartamentFromBoss = async(id) => {
  try {
    const [departament] = await pool.query(
      'select * from departament where idBoss=?', [id]
    )
    if (departament.length !== 0) {
      return false
    } else {
      return true
    }
  } catch (error) {
    return error
  }
}

export const deleteBoss = async(req, res) => {
  try {
    const {id} = req.params;
    const verifyBossDepartament = await getDepartamentFromBoss(id)
    if(verifyBossDepartament) {
      const [boss] = await pool.query('delete from boss where idBoss=?', [id])
      if(boss.affectedRows <=0) {
        res.status(200).json({Mensaje: 'No se encontro un superior con el id indicado'})
      } else {
        res.status(200).json({Mensaje: `Superior con id ${id} eliminado`})
      }
    } else {
      res.status(400).json({Mensaje: 'No se puede eliminar un superior que esta designado en un area de trabajo'})
    }
  } catch (error) {
    return res.status(500).json({Mensaje: 'Algo salio mal'})
  }
}
