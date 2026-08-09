import { AlertCircle, Send } from "lucide-react";

export function SubmitArea({ submitted, label = "Submit" }) {
  if (submitted) {
    return (
      <div className="form-pending" role="status">
        <AlertCircle size={21} />
        <span><strong>Submission not sent.</strong> Secure email delivery is still being configured. Please contact the Nexus team directly if your request is time-sensitive.</span>
      </div>
    );
  }
  return <button className="btn btn-primary" type="submit">{label} <Send size={16} /></button>;
}
