import { setAuthCookies } from 'next-firebase-auth';
import initAuth from 'src/firebase/base';

initAuth();
const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ status: true });
};

export default handler;
