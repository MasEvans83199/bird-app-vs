import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ycfcamxsouvagmrltkbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkwMDY5NiwiZXhwIjoxOTk5NDc2Njk2fQ.HnRHsN9-nfvLXrxcMou7L4kerT6TAz77YCOMl6jZz8c'
)

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (data) {
      alert("Password updated successfully");
    } else {
      alert("Error updating password");
    }

    setLoading(false);
  };

  useEffect(() => {
    // Your useEffect logic here, if needed
  }, []);

  return (
    <div className="grid place-items-center">
      <Card className="w-1/2 mt-12">
        <div className="grid place-items-center">
          <CardHeader
            color="light-blue"
            className="mb-4 grid h-20 w-1/2 place-items-center"
          >
            <Typography variant="h6">Update Password</Typography>
          </CardHeader>
        </div>
        <CardBody divider>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              color="orange"
              size="lg"
              loading={loading}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default UpdatePassword;