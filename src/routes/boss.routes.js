import { Router } from "express";

import { createBoss, deleteBoss, getBoss, getBossById, updateBoss } from '../controllers/boss.controller.js'

const router = Router()
router.get('/', getBoss)
router.get('/:id', getBossById)
router.post('/', createBoss)
router.patch('/:id', updateBoss)
router.delete('/:id', deleteBoss)

export default router
