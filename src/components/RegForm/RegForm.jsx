import './RegForm.css'
import Lottie from 'lottie-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/ecom-logo.png'
import Animation2 from '../../animations/hi.json'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const RegForm = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleSignUpSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email
    });

    setName('');
    setEmail('');
    setPassword('');
    alert('Signed up successfully!');

    setIsSignup(false);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      setError('Email is already registered');
    } else {
      setError('Something went wrong, please try again.');
    }
  }
};


    const handleLogInSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, 'users', uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                localStorage.setItem('username', userData.name);
                setEmail('');
                setPassword('');
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className='r-container'>
            <div className='r-head'>
                <img className='logo' src={logo} />
                <h1>ShopNShine</h1>
            </div>
            <div className='r-wrapper'>
                <div style={{
                    width: '100%',
                    maxWidth: '635px'
                }}>
                    <Lottie animationData={Animation2} loop={true} />
                </div>
                <div className='form-container'>
                    <h2 className='f-desc'>Hey! <br /> Sign up/Sign in to continue</h2>
                    <form className='reg-form' onSubmit={isSignup ? handleSignUpSubmit : handleLogInSubmit}>
                        {isSignup &&
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="reg-input"
                            />}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="reg-input"
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="reg-input"
                        />

                        {error && <p style={{ color: 'white', textAlign: 'justify' }}>{error}</p>}

                        <button type='submit' className='form-btn'>
                            {isSignup ? 'Sign up' : 'Sign in'}
                        </button>
                    </form>
                    <p className='toggle' style={{ color: '#604652' }}>
                        {isSignup ? (
                            <>
                                Already have an account?{' '}
                                <span className='toggle-link' onClick={() => {
                                    setIsSignup(false);
                                    setError('');
                                }}>Sign In</span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <span className='toggle-link' onClick={() => {
                                    setIsSignup(true);
                                    setError('');
                                }}>Sign Up</span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegForm