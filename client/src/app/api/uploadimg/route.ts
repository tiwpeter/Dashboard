import { NextRequest, NextResponse } from "next/server"; // เพิ่มการ import NextRequest และ NextResponse
import path from "path";
import { writeFile } from "fs/promises";
import slugify from 'slugify';

export const POST = async (req: NextRequest, res: NextResponse) => { // ระบุชนิดของ req และ res
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const reader = new FileReader(); // สร้าง FileReader object
  reader.readAsArrayBuffer(file as Blob); // อ่านข้อมูลจาก 'file' เป็น array buffer

  reader.onload = async () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer); // สร้าง buffer จาก array buffer
      const fileName = slugify((file as File).name, { lower: true }); // เข้าถึง property 'name' จาก 'file'

      try {
          await writeFile(
              path.join(process.cwd(), "public/images/" + fileName),
              buffer
          );
          const slug = fileName;
          const imageUrl = `http://localhost:${process.env.PORT}/images/${fileName}`;
          return NextResponse.json({ Message: "Success", slug, imageUrl, status: 201 });

      } catch (error) {
          console.log("Error occurred ", error);
          return NextResponse.json({ Message: "Failed", status: 500 });
      }
  };

  reader.onerror = () => {
      console.log("Error reading file");
      return NextResponse.json({ Message: "Failed", status: 500 });
  };
}
