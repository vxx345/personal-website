# 媒体素材来源与授权

## 首屏轮播视频（`public/media/hero/01–06.mp4`）

| 文件 | 场景 | 来源 | 原始 ID | 授权 |
| --- | --- | --- | --- | --- |
| 01 | 云海 / 快速流动的白云 | Mixkit | 51105 | Mixkit Free License |
| 02 | 黄昏 / 海边落日 | Mixkit | 2168 | Mixkit Free License |
| 03 | 山脊 / 航拍雪山岩峰 | Mixkit | 51689 | Mixkit Free License |
| 04 | 雾林 / 林间小径 | Mixkit | 50847 | Mixkit Free License |
| 05 | 蓝调 / 暮色城市航拍 | Mixkit | 41375 | Mixkit Free License |
| 06 | 夜空 / 星空延时 | Mixkit | 14428 | Mixkit Free License |

原始地址格式：`https://assets.mixkit.co/videos/<id>/<id>-720.mp4`

本地处理：ffmpeg 转码为 1280 宽、8s、去除音轨、H.264 CRF30、`+faststart`；
每段同时导出首帧 `01–06.jpg` 作为 poster。转码后单段 0.6–1.7MB。

**Mixkit Free License 要点**：可用于商业与非商业项目，无需署名；
不得将素材本身作为独立商品转售/再分发；用于模板类产品前需单独确认条款。
本站在此仅作背景展示用途。

## 背景音乐（`public/audio/bgm.mp3`）

| 项目 | 内容 |
| --- | --- |
| 曲目 | lofi-study-112191 |
| 来源 | Pixabay Audio |
| 授权 | Pixabay Content License（免费商用、无需署名） |
| 体积 | 4.5MB（`preload="none"`，点击才下载） |

## 字体

使用系统字体栈（`-apple-system` / `Segoe UI` / `PingFang SC` / `Microsoft YaHei`），
不引入第三方 Web Font，无授权风险。
