export async function POST() {
  const response = await fetch("https://webhook.site/token", {
    method: "POST",
  });

  const data = await response.json();
  return Response.json(data);
}
