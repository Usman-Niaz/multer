import express from 'express'
import { registeration,login } from "../controller/user.controller.js";
import { asyncWrapper } from '../middleware/asyncWrapper.middleware.js';

const router =express.Router()
router.post('/register',asyncWrapper(registeration))
router.post('/login',asyncWrapper(login))
export default router