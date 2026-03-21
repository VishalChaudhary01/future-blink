import { askAi, saveConversation } from "@/controllers";
import { Router } from "express";

const router = Router();

router.post("/ask-ai", askAi);
router.post("/save", saveConversation);

export default router;
