/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.windows;

import com.mugui.MAIN.MAIN;

import java.awt.AWTException;
import java.awt.Color;
import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.peer.RobotPeer;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class Tool {
	private BufferedImage image = null;
	private RobotPeer peer = null;

	public Tool() {
		try {
			robot = new Robot();
			peer = ((sun.awt.ComponentFactory) Toolkit.getDefaultToolkit()).createRobot(robot,
					GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice());
		} catch (AWTException e) {
			e.printStackTrace();
		}
	}

	int lss = 0;
	private hls[][] tuqu = null;
	private hls[][] tuyu = null;
	private int tuquW;
	private int tuquH;
	private int tuyuW;
	private int tuyuH;
	hls black = RGB转HLS(new Color(255, 255, 255));

	public String dy_code = "";

	private int height = 0;
	private int width = 0;
	private int[][] tu = null;
	private int[][] tu2 = null;
	private int zuox;
	private int zuoy;
	private int youx;
	private int youy;

	public int[] getScreenBufferInt(int x, int y, int x2, int y2) {
		Toolkit.getDefaultToolkit().sync();
		Rectangle rectangle = new Rectangle(x, y, x2, y2);
		return peer.getRGBPixels(rectangle);
	}

	public BufferedImage 截取屏幕(int x, int y, int x2, int y2) {
		return image = robot.createScreenCapture(new Rectangle(x, y, x2 - x + 1, y2 - y + 1));
	}

	public Color StringColor(String color) {
		int b = Integer.parseInt(color.substring(0, 2), 16);
		int g = Integer.parseInt(color.substring(2, 4), 16);
		int r = Integer.parseInt(color.substring(4, 6), 16);
		return new Color(r, g, b);
	}

	public double 颜色比较(Color color1, Color color2) {
		return 得到颜色相似度(RGB转HLS(color1), RGB转HLS(color2));
	}

	public double 颜色比较(int rgb1, int rgb2) {
		int r1 = rgb1 >> 16 & 0xFF;
		int g1 = rgb1 >> 8 & 0xFF;
		int b1 = rgb1 >> 0 & 0xFF;
		int r2 = rgb2 >> 16 & 0xFF;
		int g2 = rgb2 >> 8 & 0xFF;
		int b2 = rgb2 >> 0 & 0xFF;
		return (255.0D - (Math.abs(r1 - r2) * 0.297D) - (Math.abs(g1 - g2) * 0.593D) - (Math.abs(b1 - b2) * 0.11D));
	}

	public double 得到颜色相似度(hls hls1, hls hls2) {
		double h = hls1.h - hls2.h;
		double s = hls1.s - hls2.s;
		double v = hls1.v - hls2.v;
		h = Math.sqrt(h * h + s * s + v * v);
		return Math.abs(h);
	}

	private hls RGB转HLS(Color color1) {
		hls h = new hls();
		double r = color1.getRed() / 255.0D;
		double g = color1.getGreen() / 255.0D;
		double b = color1.getBlue() / 255.0D;
		h.h = r;
		h.s = g;
		h.v = b;

		return h;
	}

	public Point 图中找图(BufferedImage image, BufferedImage img, double d, int x, int y) {
		this.image = image;
		this.tuquW = image.getWidth();
		this.tuquH = image.getHeight();
		this.tuyuW = img.getWidth();
		this.tuyuH = img.getHeight();
		this.tuqu = 得到图片数组(image);
		this.tuyu = 得到图片数组(img);
		Point p = 从A图查找是否有B图(d);
		if (p != null) {
			p.x += x;
			p.y += y;
		}
		return p;
	}

	public Point 图中找图EX(BufferedImage image, BufferedImage img, double d, int x, int y) {
		this.image = image;
		this.tuquW = image.getWidth();
		this.tuquH = image.getHeight();
		this.tuyuW = img.getWidth();
		this.tuyuH = img.getHeight();
		this.tuqu = 得到图片数组(image);
		this.tuyu = 得到图片数组EX(img);
		Point p = 从A图查找是否有B图(d);
		if (p != null) {
			p.x += x;
			p.y += y;
		}
		return p;
	}

	private Point 从A图查找是否有B图(double d) {
		for (int i = 0; i < this.tuquW - this.tuyuW + 1; ++i) {
			for (int j = 0; j < this.tuquH - this.tuyuH + 1; ++j) {
				if (判断两个图的某区域相似性(i, j, d) <= d) {
					Point p = new Point(i, j);
					return p;
				}
			}
		}

		return null;
	}

	private double 判断两个图的某区域相似性(int i, int j, double d) {
		int f = 0;
		double zo = 0.0D;
		int w = 1;
		int h = 1;

		for (int n = 0; n < this.tuyuW; n += w) {
			for (int m = 0; m < this.tuyuH; m += h) {
				if (this.tuyu[n][m] == null)
					continue;
				if (this.tuqu[(i + n)][(j + m)] == null) {
					continue;
				}

				double z = 得到颜色相似度(this.tuqu[(i + n)][(j + m)], this.tuyu[n][m]);

				if ((f > 20) && (zo / f >= d * 2.0D))
					return 99.0D;
				zo += z;
				++f;
			}
		}
		if (f == 0)
			return 99.0D;
		return (zo / f);
	}

	public hls[][] 得到图片数组(BufferedImage image) {
		hls[][] hl = new hls[image.getWidth()][image.getHeight()];
		for (int i = 0; i < image.getWidth(); ++i) {
			for (int j = 0; j < image.getHeight(); ++j) {
				hl[i][j] = RGB转HLS(new Color(image.getRGB(i, j)));
			}
		}
		return hl;
	}

	public hls[][] 得到图片数组EX(BufferedImage image) {
		hls[][] hl = new hls[image.getWidth()][image.getHeight()];
		Color color = null;
		if ((image.getRGB(0, 0) == image.getRGB(image.getWidth() - 1, 0)) && (image.getRGB(0, 0) == image.getRGB(0, image.getHeight() - 1))
				&& (image.getRGB(0, 0) == image.getRGB(image.getWidth() - 1, image.getHeight() - 1))) {
			color = new Color(image.getRGB(0, 0));
		}
		for (int i = 0; i < image.getWidth(); ++i) {
			for (int j = 0; j < image.getHeight(); ++j) {
				Color color2 = new Color(image.getRGB(i, j));
				if ((color != null) && (颜色比较(color, color2) == 0.0D)) {
					hl[i][j] = null;
				} else {
					hl[i][j] = RGB转HLS(new Color(image.getRGB(i, j)));
				}
			}

		}

		return hl;
	}

	public void 保存图片(BufferedImage bufferedImage, String string) {
		try {
			ImageIO.write(bufferedImage, "bmp", new File(MAIN.JARFILEPATH + "\\temp\\" + string));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public boolean paint(BufferedImage image) {
		this.image = image;

		return (!(chuli().trim().equals("")));
	}

	private int bianli(int rgb, int yuanx, int x, int y, int j) {
		this.tu[x][y] = 1;
		if (Math.abs(yuanx - x) > 6)
			return 0;
		if ((x - 1 >= 0) && (this.image.getRGB(x - 1, y) == rgb) && (this.tu[(x - 1)][y] == 0)) {
			j = bianli(rgb, yuanx, x - 1, y, j + 1);
		}
		if ((x + 1 < 150) && (this.image.getRGB(x + 1, y) == rgb) && (this.tu[(x + 1)][y] == 0)) {
			j = bianli(rgb, yuanx, x + 1, y, j + 1);
		}
		if ((y - 1 >= 0) && (this.image.getRGB(x, y - 1) == rgb) && (this.tu[x][(y - 1)] == 0)) {
			j = bianli(rgb, yuanx, x, y - 1, j + 1);
		}
		if ((y + 1 < this.height) && (this.image.getRGB(x, y + 1) == rgb) && (this.tu[x][(y + 1)] == 0)) {
			j = bianli(rgb, yuanx, x, y + 1, j + 1);
		}
		return j;
	}

	private int chuli1() {
		Color c = StringColor("5B5B5B");
		int max = 0;
		int g = 0;
		for (int i = 0; i < 50; ++i) {
			Color c2 = new Color(this.image.getRGB(i, 4));
			if (颜色比较(c, c2) > 0.05D) {
				int l = bianli(c2.getRGB(), i, i, 4, 0);
				if (l > max) {
					max = l;
					g = c2.getRGB();
				}
			}
		}
		return g;
	}

	public String chuli() {
		String key = "";
		int maxbody = 0;
		this.height = this.image.getHeight();
		this.width = this.image.getWidth();
		this.tu = new int[this.width][this.height];
		this.tu2 = new int[this.width][this.height];

		maxbody = chuli1();

		if (maxbody == 0)
			return "";
		this.tu = new int[this.width][this.height];
		for (int j = 0; j < this.width; ++j)
			for (int i = 0; i < this.height; ++i) {
				if (this.image.getRGB(j, i) == maxbody) {
					this.tu[j][i] = 1;
					this.tu2[j][i] = 1;
				} else {
					this.tu[j][i] = 0;
					this.tu2[j][i] = 0;
				}
			}
		for (int j = 0; j < this.width; ++j) {
			for (int i = 0; i < this.height; ++i) {
				if (this.tu[j][i] == 1) {
					this.zuox = 9999;
					this.zuoy = 9999;
					this.youx = -1;
					this.youy = -1;
					int size = getBImages(j, i, 0);
					if ((size < 15) || (size > 30)) {
						j = this.youx + 10;
						break;
					}
					if ((this.tu2[this.zuox][this.zuoy] == 1) || (this.tu2[(this.zuox + 1)][this.zuoy] == 1) || (this.tu2[this.zuox][(this.zuoy + 1)] == 1)) {
						if ((this.tu2[this.youx][this.zuoy] == 1) || (this.tu2[(this.youx - 1)][this.zuoy] == 1)
								|| (this.tu2[this.youx][(this.zuoy + 1)] == 1)) {
							key = key + "S";
						} else {
							key = key + "D";
						}
					} else if ((this.tu2[this.youx][this.zuoy] == 1) || (this.tu2[this.youx][(this.zuoy + 1)] == 1)
							|| (this.tu2[(this.youx - 1)][this.zuoy] == 1)) {
						key = key + "A";
					} else {
						key = key + "W";
					}

					j = this.youx + 10;
					break;
				}
			}
		}

		return key;
	}

	public int getBImages(int x1, int y1, int size) {
		this.tu[x1][y1] = 0;
		if (this.zuox > x1)
			this.zuox = x1;
		if (this.zuoy > y1)
			this.zuoy = y1;
		if (this.youx < x1)
			this.youx = x1;
		if (this.youy < y1)
			this.youy = y1;
		if ((x1 - 1 > 0) && (this.tu[(x1 - 1)][y1] == 1))
			size = getBImages(x1 - 1, y1, size + 1);
		if ((y1 - 1 > 0) && (this.tu[x1][(y1 - 1)] == 1))
			size = getBImages(x1, y1 - 1, size + 1);
		if ((x1 + 1 < this.width) && (this.tu[(x1 + 1)][y1] == 1))
			size = getBImages(x1 + 1, y1, size + 1);
		if ((y1 + 1 < this.height) && (this.tu[x1][(y1 + 1)] == 1))
			size = getBImages(x1, y1 + 1, size + 1);
		return size;
	}

	public String getColorInHexFromRGB(int r, int g, int b) {
		return vali(getHexNum(b)) + vali(new StringBuilder(String.valueOf(getHexNum(g))).append(vali(getHexNum(r))).toString());
	}

	private String vali(String s) {
		if (s.length() < 2) {
			s = "0" + s;
		}
		return s;
	}

	private String getHexNum(int num) {
		int result = num / 16;
		int mod = num % 16;
		StringBuilder s = new StringBuilder();
		hexHelp(result, mod, s);
		return s.toString();
	}

	private void hexHelp(int result, int mod, StringBuilder s) {
		char[] H = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };
		if (result > 0) {
			hexHelp(result / 16, result % 16, s);
		}
		s.append(H[mod]);
	}

	public void 删除图片(String string) {
		File f = new File(MAIN.JARFILEPATH + "\\data\\" + string);
		if (f.exists())
			f.delete();
	}

	public BufferedImage 得到图的特征图(BufferedImage img, double d, String string) {
		Color color = StringColor(string);
		boolean bool = false;
		this.image = new BufferedImage(img.getWidth(), img.getHeight(), img.getType());
		for (int i = 0; i < this.image.getWidth(); ++i) {
			for (int j = 0; j < this.image.getHeight(); ++j)
				if (((i == 0) && (j == 0)) || ((i == 0) && (j == this.image.getHeight() - 1)) || ((i == this.image.getWidth() - 1) && (j == 0))
						|| ((this.image.getWidth() - 1 == i) && (j == this.image.getHeight() - 1))) {
					this.image.setRGB(i, j, new Color(0, 0, 0).getRGB());
				} else if (颜色比较(new Color(img.getRGB(i, j)), color) <= d) {
					bool = true;
					this.image.setRGB(i, j, img.getRGB(i, j));
				} else {
					this.image.setRGB(i, j, new Color(0, 0, 0).getRGB());
				}
		}
		return ((bool) ? this.image : null);
	}

	private class hls {
		double h;
		double s;
		double v;
	}

	private Robot robot;

	public void mouseMove(int i, int j) {
		robot.mouseMove(i, j);
	}

	public void delay(int i) {
		robot.delay(i);
	}

	public void mouseRelease(int button1) {
		robot.mouseRelease(button1);
	}

	public void mousePress(int button1) {
		robot.mousePress(button1);
	}

	public void keyRelease(int vkSpace) {
		robot.keyRelease(vkSpace);
	}

	public void keyPress(int vk) {
		robot.keyPress(vk);
	}

}