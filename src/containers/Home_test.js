import React from 'react'

import DoodleDragger from '../components/DoodleDraggerComponent';

class Home extends React.Component {
	render () {
		return (
			<div>
				<div className="wrapper wrapper--wide wrapper--elastic mx-auto mb4">
					<section className="l-pl2 l-border-left-fat border-left-debian-red">
						<h2 className="h1 m-h0 line-height-2 normal color-paris">Make The Web Great Again. 💪</h2>
						<p className="l-col-6">I&lsquo;m Florian, a transdisciplinairy creative on a never ending quest to build better things for the inhabitants of the World Wide Web.</p>
						<p className="l-col-6">Currently working at <a href="//adagio.company">Adagio</a>, based in Ghent.</p>
					</section>
				</div>
				<DoodleDragger/>
				<div className="flex">
					<div>
						<img width="640" height="640" src="https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13256562_276569449348451_1413851376_n.jpg?ig_cache_key=MTI1MTY2ODI4OTE3ODMzNTg1MA%3D%3D.2" alt=""/>
					</div>
					<div>
						<img width="640" height="640" src="https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13260812_963336960447272_1895825844_n.jpg?ig_cache_key=MTI1MTY0MDAzNDQ4NDMyMDkyNA%3D%3D.2" alt=""/>
					</div>
					<div>
						<img width="640" height="640" src="https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13116684_250995255290222_773627310_n.jpg?ig_cache_key=MTI1MTM4MzM1OTU0NjM1ODI1Ng%3D%3D.2" alt=""/>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
