import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate(); // Acceder a la función de navegación
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password
    };

    const response = loginUser(user);
    console.log('LOGIN HECHO', response);

    navigate('/character'); // Redireccionar a /character
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={handleInputChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

async function loginUser(user: { email: string, password: string }) {
  try {
    const baseUrl = 'http://localhost:8080/';
    const path = 'api/user/login';
    const url = baseUrl + path;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    const { token } = await response.json();
    console.log('token', token);

    //Guardar token en localStorage
    localStorage.setItem('token', token);
  } catch (error) {
    console.log('error', error)
  }
}