//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.mugui.Mail;

import com.mugui.tool.Other;

public class SendMailToSomeone {
    public SendMailToSomeone() {
    }

    public static void main(String[] args) {
        MailBean mailBean = new MailBean();
        mailBean.setTitle("黑色沙漠咸鱼辅助系统");
        mailBean.setSendTo("123@qq.com");
       String  s = Other.getVerifyCode(8);
        mailBean.setMailbody("咸鱼盒子群：304814727<br>本次操作验证码为： " + s);
        new SendMailToSomeone().send(mailBean);
    }
    public boolean send(MailBean mb) {
        mb.getClass();
        MysendMail themail = new MysendMail("smtp.126.com");
        themail.setNeedAuth(true);
        if (!themail.setSubject(mb.getTitle())) {
            return false;
        } else if (!themail.setBody(mb.getMailbody())) {
            return false;
        } else if (!themail.setTo(mb.getSendTo())) {
            return false;
        } else {
            mb.getClass();
            if (!themail.setFrom("123@126.com")) {
                return false;
            } else {
                mb.getClass();
                mb.getClass();
                themail.setNamePass("123@126.com", "123");
                return themail.sendout();
            }
        }
    }
}
