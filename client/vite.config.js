import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000',
        secure: false,
      },
    }
  },

  //so we have created a server/ We say, each time u see /api, add the
  //localhost:3000 at the begining

  plugins: [react()],
})

/*
- Here we configured a proxy for the /api path
- The proxy intercepts any request from your React app (running on http://localhost:5173)
  that starts with /api
- It redirects the request to the target backend server (http://localhost:3000),
  preserving the rest of the path.
- So out fetch call: fetch('/api/auth/signup');
  is automatically rewritten by the proxy to: fetch('http://localhost:3000/api/auth/signup');

*/
