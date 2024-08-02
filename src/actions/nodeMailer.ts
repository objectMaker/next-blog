'use server';
import nodemailer from 'nodemailer';
import db from '@/db';
import { CodeStatus } from '@prisma/client';
const MilliSeconds = 1000 * 60 ;
const expireMilliSeconds = MilliSeconds * 5;

const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

export const createVerifyCode = async (formData: FormData) => {
  const email = formData.get('email') as string;
  console.log(email, 'email');

  await db.verificationCode.deleteMany({
    where: {
      email: email,
      createdAt: {
        lt: new Date(Date.now() - MilliSeconds).toISOString(),
      },
    },
  });

  const haveLatest = await db.verificationCode.findMany({
    where: {
      email,
      createdAt:{
        gt: new Date(Date.now() - expireMilliSeconds).toISOString(),
      },
    },
  });
  if (haveLatest?.length) {
    //if have Pending status return don't create
    throw new Error(`don't get verify code too frequent ,please try again later`)
  }
  const code = Math.random().toFixed(4).slice(2) + '';
  await db.verificationCode.deleteMany({
    where: {
      email,
    },
  });
  const res = await db.verificationCode.create({
    data: {
      code,
      email,
    },
  });
  // send mail with defined transport object
   try{

    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: 'website verify code', // Subject line
      text: 'Hello world?', // plain text body
      html: `<div style="display:flex;justify-content:center;align-items:center;flex-direction:column;">
          <div style="display:flex;justify-content:center;align-items:center;">
            <div>
              your verify code is : 
            </div>
            <h1 style="color:blue;">
              ${code}
            </h1>
          </div>
          <h3>
            your verify code will expired after 5 minutes
          </h3>
      </div>`, // html body
    });
    console.log(res.id)
      await db.verificationCode.update({
        where: {
          id: res.id,
        },
        data: {
          sendStatus: CodeStatus.Arrived,
        },
      });
   }catch(err){
    db.verificationCode.delete({
      where: {
        id: res.id,
      },
    });
    throw err;
   }
    

};

export const verifyCode: (formData: FormData) => Promise<boolean> = async (
  formData,
) => {
  const code = formData.get('code') as string;
  const email = formData.get('email') as string;
  const res = await db.verificationCode.findFirst({
    where: {
      email,
      code,
    },
  });
  if (!res?.createdAt) {
    console.log('验证失败');
    return false;
  }
  //判断是否过期，验证码为1分钟
  if (+res.createdAt + expireMilliSeconds < Date.now()) {
    //过期，删掉
    db.verificationCode.delete({
      where: {
        id: res.id,
      },
    });
    console.log('yan整失败111');
    return false;
  }
  //还有验证码不对
  if (code !== res.code) {
    console.log('yan整失败');
    return false;
  }
  db.verificationCode.deleteMany({
    where: {
      email: res.email,
    },
  });
  console.log('yan整成功');
  return true;
};
