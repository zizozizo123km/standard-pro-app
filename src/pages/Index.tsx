import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import MetaLogo from '@/components/MetaLogo'; // Assume a component for the Meta/Facebook logo exists

// Mock authentication context/API call placeholder
const mockLogin = (email: string, password: string) => {
  return new Promise<{ success: boolean; token?: string }>((resolve) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({ success: true, token: 'mock-auth-token-123' });
      } else {
        resolve({ success: false });
      }
    }, 1000);
  });
};

const IndexPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated (e.g., check local storage)
    const token = localStorage.getItem('authToken');
    if (token) {
      // If authenticated, redirect to the home feed
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await mockLogin(email, password);
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        navigate('/home');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl flex-col items-center justify-around md:flex-row md:space-x-10">
        
        {/* Left Side: Pitch/Marketing Content */}
        <div className="mb-12 max-w-md text-center md:mb-0 md:text-left">
          <div className="mx-auto md:mx-0 w-fit">
            <MetaLogo className="text-blue-600 h-20 w-auto" /> 
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800 md:text-5xl">
            Facebook helps you connect and share with the people in your life.
          </h1>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-none rounded-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold hidden">Log In</CardTitle>
              <CardDescription className="hidden">Enter your details to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="sr-only">Email or Phone Number</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address or phone number"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-lg"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-lg"
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <Button 
                  type="submit" 
                  className={cn(
                    "w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700",
                    isLoading && "opacity-80 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging In...' : (
                    <>
                      <LogIn className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                      Log In
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center mt-3">
                <Button variant="link" className="text-sm text-blue-600 hover:underline p-0 h-auto">
                  Forgotten password?
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <Button 
                  onClick={handleCreateAccount} 
                  variant="default"
                  className="h-12 px-6 text-base font-bold bg-green-500 hover:bg-green-600"
                >
                  <UserPlus className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  Create new account
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <p className="mt-6 text-center text-sm">
            <a href="#" className="font-bold hover:underline">Create a Page</a> for a celebrity, band or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;