import { Router } from "express";

import {createDepartament, getDepartament, getDepartamentById, updateDepartament, deleteDepartament } from '../controllers/departament.controller.js'

const router = Router()
router.get('/', getDepartament)
router.get('/:id', getDepartamentById)
router.post('/', createDepartament)
router.patch('/:id', updateDepartament)
router.delete('/:id', deleteDepartament)

export default router
