import { Router } from "express";

import { getEmployes, createEmployee, updateEmplyee, deleteEmplyee, getEmployeById } from "../controllers/employes.controller.js";

const router =  Router()
router.get('/', getEmployes)
router.get('/:id', getEmployeById)
router.post('/addEmployee', createEmployee)
router.patch('/:id', updateEmplyee)
router.delete('/:id', deleteEmplyee)

export default router;
