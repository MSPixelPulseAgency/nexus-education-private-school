import { CheckCircle2, Send } from "lucide-react";

export function SubmitArea({ submitted, label = "Submit" }) {
  if (submitted) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={21} />
        <span><strong>Your details are ready.</strong> Online submissions are being finalized. Please contact the Nexus team directly if your request is time-sensitive.</span>
      </div>
    );
  }
  return <button className="btn btn-primary" type="submit">{label} <Send size={16} /></button>;
}
