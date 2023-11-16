import type { NextApiRequest, NextApiResponse } from 'next';
import { refreshToken } from '../../../../services/authService';

export async function POST(req: NextApiRequest, res: NextApiResponse) {

  try {
    const { oldToken } = req.body; // Adjust based on how you send the refresh token
    const newToken = await refreshToken(oldToken);
    res.status(200).json({ newToken });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
  } else {
    res.status(400).json({ message: "Unknown error" });
  }
  }
}
