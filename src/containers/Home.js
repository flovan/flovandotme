import React from 'react'
import {Link} from 'react-router';

import Wrapper from '../components/WrapperComponent';
import Icon from '../components/IconComponent';

class Home extends React.Component {
	render () {
		return (
			<main className="relative py3">
				<Wrapper wide={true} elastic={true}>

					<div className="s-flex l-inline-block l-wgs align-top mb4 l-mb0">
						<div className="xxs-wgl s-col-4 l-w100 xxs-mx-auto mb4 align-top">
							<Icon type="flovan-mark-textured"/>
						</div>{/*

						*/}<article className="s-col-8 s-pl5 l-w100 l-pl0 align-top">
							<h2 className="mb4 line-height-1 uppercase spaced">
								About Me
							</h2>
							<p>Hi, I'm Florian Vanthuyne. I was born and raised in a rural part of Belgium, where I was spoonfed to tinker with technology from early on. Whilst growing up, the Sega and Windows machine at home shaped my interest in graphics and computers.</p>
							<p>In secondary school, I started experimenting with Flash (ugh!) and Action Script and wrote scripts in TI-BASIC to automate Math calculations (and store course notes from time to time).</p>
							<p>I then studied <a href="//devine.be">Devine</a> at <a href="//howest.be">Howest</a>, where I&mdash;amongst other valuable skills&mdash;learned how to program properly.</p>
							<p>Right now, I live in Ghent and work at <a href="//adagio.company">Adagio</a>, where I try to do my best to develop fast and reliable online experiences.</p>
						</article>
					</div>{/*

					*/}<article className="l-inline-block l-wgl l-pl4 align-top">
						<section className="mb2">
							<h2 className="mb4 line-height-1 uppercase spaced">
								Projects
							</h2>
							<ul className="list-reset flex flex-wrap mxn2">
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//headstart.io">
											Headstart
										</a>
									</h3>
									<p>A pre-configured, automated front-end workflow.</p>
								</li>
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//github.com/flovan/whumph">
											Whumph
										</a>
									</h3>
									<p>Lightweight enhancements to ease the use of vanilla JS.</p>
								</li>
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//flovan.me/interstellar">
											Interstellar
										</a>
									</h3>
									<p>A series of ST3 themes inspired by a journey into outerspace.</p>
								</li>
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//github.com/flovan/stilt">
											Stilt
										</a>
									</h3>
									<p>A JS script to make elements the same height.</p>
								</li>
							</ul>
						</section>
						<section className="mb2">
							<h2 className="mb4 line-height-1 uppercase spaced">
								Things I worked on
							</h2>
							<ul className="list-reset flex flex-wrap mxn2">
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//adagio.company">
											Adagio
										</a>
									</h3>
									<p>Design, Front-end, Wordpress Theme</p>
								</li>
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//healthysolutions.nl">
											Healthysolutions
										</a>
									</h3>
									<p>Design, Front-end</p>
								</li>
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//nominum.com">
											Nominum
										</a>
									</h3>
									<p>Design, Front-end, Wordpress Theme</p>
								</li>
							</ul>
						</section>
						<section className="mb2 pb2 border-accent-2">
							<a className="inline-block col-8 align-top" href="https://www.instagram.com/p/BHTxc0xhulS/">
								<img src="https://scontent.cdninstagram.com/l/t51.2885-15/s640x640/sh0.08/e35/13551573_785607518206843_1131036327_n.jpg?ig_cache_key=MTI4NDU4NzgwMzgyMDYxNjAxOA%3D%3D.2" />
							</a>{/*
							*/}<div className="inline-block col-4 align-top">
								<a href="https://www.instagram.com/p/BGzfvLcGHq8/">
									<img src="https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13388557_1740403862916114_1173794916_n.jpg?ig_cache_key=MTI3NTUwMjcwMTAxNTc1OTU0OA%3D%3D.2" />
								</a>
								<a href="https://www.instagram.com/p/BGPfrNUmHgM/">
									<img src="https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13397642_966454246806523_1374064504_n.jpg?ig_cache_key=MTI2NTM2OTMyODk5NzkyMjgyOA%3D%3D.2" />
								</a>
							</div>
						</section>
						<section>
							<h2 className="mb4 line-height-1 uppercase spaced">
								Other stuff
							</h2>
							<ul className="list-reset flex flex-wrap mxn2">
								<li className="col-6 px2 mb2">
									<h3 className="line-height-2 mbh">
										<a href="//flovan.me/gifs">
											GIFS
										</a>
									</h3>
									<p>Personal collection of GIFs, wrapped up in a neat interface.</p>
								</li>
							</ul>
						</section>
					</article>

				</Wrapper>
			</main>
		);
	}
}

export default Home;
