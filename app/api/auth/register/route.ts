import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../../../services/authService';

export async function POST(req: NextApiRequest, res: NextApiResponse) {

  try {
    const { email, password } = req.body;
    const token = await registerUser(email, password);
  
    res.status(201).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error" });
    }
  }
}