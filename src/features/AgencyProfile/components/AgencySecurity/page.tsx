
import { Input, Button } from "../../../../components/page";
import { API_SERVICES_URLS, FORM_VALIDATION } from "../../../../data/page";
import { useSWRMutationHook } from "../../../../hooks/page";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getAuthData, getFieldHelperText } from "../../../../utils/page";

const MAX_RESEND_ATTEMPTS = 4;

export const AgencySecurity = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0); // Initialize the timer to 0
  const [resendAttempts, setResendAttempts] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();
  const otp = watch("otp");
  const newPassword = watch("newPassword");
  const passwordConfirm = watch("passwordConfirm");

  useEffect(() => {
    const authData = getAuthData();
    const storedEmail = authData?.email || "";
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    let interval:any;
    if (otpSent && timer > 0 && !otpVerified) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      if (!otpVerified && otpSent) {
        setOtpExpired(true);
      }
    }
    return () => clearInterval(interval);
  }, [otpSent, timer, otpVerified]);

  const { customTrigger: sendOtp } = useSWRMutationHook(
    API_SERVICES_URLS.FORGET_PASSWORD,
    "POST"
  );

  const { customTrigger: verifyOtp } = useSWRMutationHook(
    API_SERVICES_URLS.VERIFY_CODE,
    "POST"
  );

  const { customTrigger: resetPassword } = useSWRMutationHook(
    API_SERVICES_URLS.RESET_PASSWORD,
    "PUT"
  );

  const handleSendOtp = async () => {
    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      alert("You have reached the maximum number of resend attempts for today.");
      return;
    }
    try {
      await sendOtp({ email });
      setOtpSent(true);
      setTimer(120); // Set the timer to 2 minutes
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setOtpExpired(false); // Reset the expired state when resending OTP
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      await verifyOtp({ resetCode: otp });
      setOtpVerified(true); // Stop the timer upon successful OTP verification
      setOtpExpired(false); 
    } catch (error) {
      console.error("Error verifying OTP", error);
    }
  };

  useEffect(() => {
    if (otp && otp.length === 6) {
      handleVerifyOtp(otp);
    }
  }, [otp]);

  const onSubmit = handleSubmit(async (data) => {
    const { newPassword, passwordConfirm } = data;
    if (newPassword !== passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await resetPassword({ email, newPassword, passwordConfirm });
      console.log("Password has been reset successfully");
    } catch (error) {
      console.log("Error resetting password", error);
    }
  });

  const isFormValid =
    newPassword &&
    passwordConfirm &&
    otp &&
    newPassword.length >= 6 &&
    passwordConfirm === newPassword &&
    otp.length === 6;

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <form className="py-5 font-nunito" onSubmit={onSubmit}>
      <h2 className="text-primary font-semibold text-base underline py-5 uppercase">
        Change password
      </h2>
      <div className="grid gap-x-6 gap-y-3 mt-3 mb-6 sm:grid-cols-2">
        <>
          <Input
            type="password"
            label="New Password"
            id="newPassword"
            {...register("newPassword", FORM_VALIDATION.newPassword)}
            error={!!errors.newPassword}
            helperText={getFieldHelperText("error", errors.newPassword?.message)}
          />
          <Input
            type="password"
            label="Confirm New Password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              ...FORM_VALIDATION.passwordConfirm,
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
            error={!!errors.passwordConfirm}
            helperText={getFieldHelperText("error", errors.passwordConfirm?.message)}
          />
        </>
        <div className="relative">
          <Input
            type="text"
            label="Email Verification Code"
            id="otp-input"
            inputClassName="placeholder:text-sm "
            placeholder="Enter OTP"
            {...register("otp", { required: true })}
          />
          {!otpVerified && (
            <div className="absolute top-[34px] left-[230px]">
              {timer > 0 ? (
                <p className="text-sm pt-1 text-primary">{formatTimer(timer)}</p>
              ) : (
                <span
                  className="text-primary text-[13px] underline  cursor-pointer hover:font-[600] whitespace-nowrap"
                  onClick={handleSendOtp}
                >
                  {otpSent ? "Resend" : "Send "}
                </span>
              )}
            </div>
          )}
          {otpExpired && !otpVerified ? (
            <p className="text-sm text-red-500">OTP expired. Please try again.</p>
          ) : otpSent ? (
            <p className="text-sm text-red-500">
              You have received OTP on your email address
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <Button
          className="bg-primary text-white uppercase px-8"
          type="submit"
          loading={isSubmitting}
          disabled={!isFormValid}
        >
          Save password
        </Button>
        <Button className="!bg-transparent border border-primary text-primary uppercase px-12">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AgencySecurity;
