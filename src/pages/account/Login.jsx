import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from '@supabase/supabase-js'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [session, setSession] = useState(null);
  const supabase = createClient(
    'https://ycfcamxsouvagmrltkbj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkwMDY5NiwiZXhwIjoxOTk5NDc2Njk2fQ.HnRHsN9-nfvLXrxcMou7L4kerT6TAz77YCOMl6jZz8c'
  )
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRedirect = () => {
    useEffect(() => {
      if (session) {
        window.location.href = "/";
      } else {
        window.location.href =
          "https://bird-website-js-1.masevans83199.repl.co/update-password";
      }
    }, [session]);
  };

  if (!session) {
    return (
      <div className="grid place-items-center">
        <Card className="w-1/2 mt-12">
          <div className="grid place-items-center">
            <CardHeader
              variant="gradient"
              color="orange"
              className="mb-4 grid h-20 place-items-center w-1/2"
            >
              <Typography variant="h2" className="place-items-center">
                Login
              </Typography>
            </CardHeader>
          </div>
          <CardBody>
            <Auth
              supabaseClient={supabase}
              providers={["discord", "google", "github"]}
              socialLayout="compact"
              redirectTo={
                !"google"
                  ? "https://bird-website-js-1.masevans83199.repl.co/update-password"
                  : !"discord"
                  ? "https://bird-website-js-1.masevans83199.repl.co/update-password"
                  : !"github"
                  ? "https://bird-website-js-1.masevans83199.repl.co/update-password"
                  : "https://bird-website-js-1.masevans83199.repl.co/"
              }
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      anchorTextColor: "gray",
                      anchorTextHoverColor: "light-gray",
                      brand: "#0ea5e9",
                      brandAccent: "#7dd3fc",
                      brandButtonText: "gray",
                      defaultButtonBackground: "#0ea5e9",
                      defaultButtonText: "white",
                      dividerBackground: "gray",
                      defaultButtonBackgroundHover: "#7dd3fc",
                    },
                  },
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate('/');
    }, 2000); // Redirect after a 2-second delay
    return (
      <div>
        <Typography variant="h5">Logged in!</Typography>
        <Typography variant="small" color="gray" className="mt-4">
          Redirecting...
        </Typography>
      </div>
    );
  }
}

export default Login;