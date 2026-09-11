import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const RedirectPage = async ({params} : { params: Promise<{ shortCode: string }>; }) => {
    const {shortCode} = await params
    
    const urlData = await prisma.url.findUnique({
    where: { shortCode: shortCode },
  });

  if (!urlData) {
    redirect('/');
  }

  redirect(urlData.originalUrl)
};

export default RedirectPage;
