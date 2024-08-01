'use server';
import nodemailer from 'nodemailer';
import db from '@/db';
import { CodeStatus } from '@prisma/client';
const expireMilliSeconds = 1000 * 60;
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '528154320@qq.com',
    pass: 'fhlmuqhukuzrbjgd',
  },
});

export const createVerifyCode = async (formData: FormData) => {
  const email = formData.get('email') as string;
  console.log(email, 'email');

  const bbbb = await db.verificationCode.deleteMany({
    where: {
      email: email,
      createdAt: {
        lt: new Date(Date.now() - expireMilliSeconds).toISOString(),
      },
    },
  });
  console.log(bbbb, 'bbb');
  const havePendding = await db.verificationCode.findMany({
    where: {
      email,
      sendStatus: CodeStatus.Pendding,
    },
  });
  if (havePendding?.length) {
    //if have pendding status return don't create
    return;
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
  const info = await transporter.sendMail({
    from: '528154320@qq.com', // sender address
    to: email, // list of receivers
    subject: 'website verify code', // Subject line
    text: 'Hello world?', // plain text body
    html: `<div style="display:flex;justify-content:center;align-items:center;">
        <div>
        your verify code is : 
        </div>
        <h1 style="color:blue;">
          ${code}
        </h1>
    </div>`, // html body
  });
  if (info.accepted) {
    db.verificationCode.update({
      where: {
        id: res.id,
      },
      data: {
        sendStatus: CodeStatus.Arraived,
      },
    });
  }
  if (info.rejected) {
    db.verificationCode.delete({
      where: {
        id: res.id,
      },
    });
  }

  console.log('Message sent: %s', info.messageId);
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
