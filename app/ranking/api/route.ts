import { promises as fs } from "fs";

export async function GET(request: Request) {
  const fileData = await fs.readFile(
    process.cwd() + "/public/ranking.txt",
    "utf8"
  );
  const rankingData = fileData.split("\n"); 

  return Response.json({ rankingData });
}

export async function POST(request: Request) {
  const body = await request.json(); 
  const { participantName, points, seconds } = body;
  await fs.appendFile(
    process.cwd() + "/public/ranking.txt",
    `\n${participantName};${points};${seconds}`
  );

  return Response.json({ message: "sucesso" });
}
