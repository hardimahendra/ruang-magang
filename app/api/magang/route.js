import { internships } from "../../_data/demo-data";

export function GET() {
  return Response.json({
    data: internships,
    source: "demo-local",
    note: "Endpoint demonstrasi. Tidak menyimpan data dan tidak memerlukan VPS.",
  });
}
