When some future Mars colonist is able to open his browser and watch a cat in a shark suit chasing a duck while riding a roomba, they will have Vint Cerf to thank.

In his role as Google's chief internet evangelist, Cerf has spent much of his time thinking about the future of the computer networks that connect us all. And he should know. Along with Bob Kahn, he was responsible for developing the internet protocol suite, commonly known as TCP/IP, that underlies the workings of the net. Not content with just being a founding father of the internet on this planet, Cerf has spent years taking the world wide web out of this world.

Working with NASA and JPL, Cerf has helped develop a new set of protocols that can stand up to the unique environment of space, where orbital mechanics and the speed of light make traditional networking extremely difficult. Though this space-based network is still in its early stages and has few nodes, he said that we are now at "the front end of what could be an evolving and expanding interplanetary backbone."

Wired.com talked to Cerf about the interplanetary internet's role in space exploration, the frustrations of network management on the final frontier, and the future headline he never wants to see.

---

<b>Wired: Though it's been around a while, the concept of an interplanetary internet is probably new to a lot of people. How exactly do you build a space network?</b>

Vint Cerf: Right, it's actually not new at all -- this project started in 1998. And it got started because 1997 was very nearly the 25th anniversary of the design of the internet. Bob Kahn and I did that work in 1973. So back in 1997, I asked myself what should I be doing that will be needed 25 years from then. And, after consultation with colleagues at the Jet Propulsion Laboratory, we concluded that we needed much richer networking than was then available to NASA and other space faring agencies.

Up until that time and generally speaking, up until now, the entire communications capabilities for space exploration had been point-to-point radio links. So we began looking at the possibilities of TCIP/IP as a protocol for interplanetary communication. We figure it worked on Earth and it ought to work on Mars. The real question was, "Would it work between the planets?"

And the answer turned out to be, "No."

The reason for this is two-fold: First of all, the speed of light is slow relative to distances in the solar system. A one-way radio signal from Earth to Mars takes between three and half and 20 minutes. So round trip time is of course double that. And then there's the other problem: planetary rotation. If you're communicating with something on the surface of the planet, it goes out of communication as the planet rotates. It breaks the available communications and you have to wait until the planet rotates back around again. So what we have is variable delay and disruption, and TCP does not do terribly well in those kinds of situations.

One of the things that the TCP/IP protocols assume is that there isn't enough memory in each of the routers to hold anything. So if a packet shows up and it's destined for a place for which you have an available path, but there isn't enough room, then typically the packet is discarded.

We developed a new suite of protocols that we called the Bundle protocols, which are kind of like internet packets in the sense that they're chunks of information. They can be quite big and they basically get sent like bundles of information. We do what's called storing forward, which is the way all packet switching works. It's just in this case the interplanetary protocol has the capacity to store quite a bit, and usually for quite a long time before we can get rid of it based on connectivity to the next hop.

---

<b>What are the challenges with working and making a communications network in space as opposed to a ground-based internet?</b>

Among the hard things, first of all, is that we couldn't use the domain name system in its current form. I can give you a quick illustration why that's the case: Imagine for a moment you're on Mars, and somebody is trying to open up an HTTP web connection to Earth. They've given you a URL that contains a domain name in it, but before you can open up a TCP connection you need to have an IP address.

So you will have to do a domain name lookup, which can translate the domain name you're trying to lookup into an IP address. Now remember you're on Mars and the domain name you're trying to look up is on Earth. So you send out a DNS lookup. But it may take anywhere from 40 minutes to an unknown amount of time -- depending on what kind of packet loss you have, whether there's a period of disruption based on planetary rotation, all that kind of stuff -- before you get an answer back. And then it may be the wrong answer, because by the time it gets back maybe the node has moved and now it has a different IP address. And from there it just gets worse and worse. If you're sitting around Jupiter, and trying to do a lookup, many hours go by and then it's just impossible.

So we had to break it into a two-phase lookup and use what's called delayed binding. First you figure out which planet you're going to, then you route the traffic to that planet, and only then you do a local lookup, possibly using the domain name.

The other thing is when you are trying to manage a network with this physical scope and all the uncertainty delays, the things we typically do for network management don't work very well. There's a protocol called SNMP, the simple network management protocol, and it is based on the idea that you can send a packet out and get an answer back in a few milliseconds, or a few hundreds of milliseconds. If you're familiar with the word ping, you'll know what I mean, because you ping something and expect to get an answer back fairly quickly. If you don't get it back in a minute or two, you begin to conclude that there is something wrong and the thing isn't available. But in space, it takes a long time for the signal to even get to the destination let alone get an answer back. So network management turns out to be a lot harder in this environment.

Then the other thing we had to worry about was security. The reason for that should be obvious -- one of the things we wanted to avoid was the possibility of a headline that says: "15-Year-Old Takes Over Mars Net." Against that possibility we put quite a bit of security into the system, including strong authentication, three way handshakes, cryptographic keys, and things of that sort in order to reduce the likelihood that someone would abuse access to the space network.

---

<b>Because it has to communicate across such vast distances, it seems like the interplanetary internet must be huge.</b>

Well, in purely physical terms -- that is, in terms of distance -- it's a pretty large network. But the number of nodes is pretty modest. At the moment, the elements participating in it are devices in planet Earth, including the Deep Space Network, which is operated at JPL. That consists of three 70-metre dishes plus a smattering of 35-metre dishes that can reach out into the solar system with point-to-point radio links. Those are part of the TDRSS ('tee-driss') system, which is used for a lot of near-Earth communications by NASA. The ISS also has several nodes on board capable of using this particular set of protocols.

Two orbiters around Mars are running the prototype versions of this software, and virtually all the information that's coming back from Mars is coming back via these store-forward relays.

The Spirit and Opportunity rovers on the planet and the Curiosity rover are using these protocols. And then there's the Phoenix lander, which descended to the north pole of Mars in 2008. It also was using these protocols until the Martian winter shut it down.

And finally, there's a spacecraft in orbit around the sun, which is actually quite far away, called EPOXI [the spacecraft was 32 million kilometres from Earth when it tested the interplanetary protocols]. It has been used to rendezvous with two comets in the last decade to determine their mineral makeup.

But what we hope will happen over time -- assuming these protocols are adopted by the Consultative Committee on Space Data Systems, which standardises space communication protocols -- then every spacefaring nation launching either robotic or manned missions has the option of using these protocols. And that means that all the spacecraft that have been outfitted with those protocols could be used during the primary mission, and could then be repurposed to become relays in a stored forward network. I fully expect to see these protocols used for both manned and robotic exploration in the future.

---

<b>What are the next steps to expand this?</b>

We want to complete the standardisation with the rest of the spacefaring community. Also, not all pieces are fully validated yet, including our strong authentication system. Then second, we need to know how well we can do flow control in this very, very peculiar and potentially disrupted environment.

Third, we need to verify that we can do serious real-time things including chat, video and voice. We will need to learn how to go from what appears to be an interactive real-time chat, like one over the phone, to probably an email-like exchange, where you might have voice and video attached but it's not immediately interactive.

Delivering the bundle is very much like delivering a piece of email. If there's a problem with email it usually gets retransmitted, and after a while you time out. The bundle protocol has similar characteristics, so you anticipate that you have variable delay that could be very long. Sometimes if you've tried many times and don't get a response, you have to assume the destination is not available.

---

<b>We often talk about how the things we invent for space are being used here on Earth. Are there things about the interplanetary internet that could potentially be used on the ground?</b>

Absolutely. The Defense Advanced Research Projects Agency (DARPA) funded tests with the US Marine Corps on tactical military communication using these highly resilient and disruption-tolerant protocols. We had successful tests that showed in a typical hostile communication environment that we were able to put three to five times more data through this disrupted system than we could with traditional TCP/IP.

Part of the reason is that we assume we can store traffic in the network. When there's high activity, we don't have to retransmit from end to end, we can just retransmit from one of the intermediate points in the system. This use of memory in the network turns out to be quite effective. And of course we can afford to do that because memory has gotten so inexpensive.

The European Commission has also sponsored a really interesting project using the DTM protocols in northern Sweden. In an area called Lapland, there's a group called the Saami reindeer herders.

They've been herding reindeer for 8,000 years up there. And the European Commission sponsored a research project managed by the Lulea University of Technology in northern Sweden to put these protocols on board all-terrain vehicles in laptops. This way, you could run a Wi-Fi service in villages in Northern Sweden and drop messages off and pick them up according to the protocols. As you move around, you were basically a data mule carrying information from one village to another.

---

<b>There was also an experiment called Mocup that involved remote controlling a robot on Earth from the space station. These protocols were used, right?</b>

Yes, we used the DTN protocols for that. We were all really excited for that because, although the protocols were originally designed to deal with very long and uncertain delay, when there is high quality connectivity, we can use it for real-time communication. And that's exactly what they did with the little German rover.

I think in general communication will benefit from this. Putting these protocols in mobile phones, for instance, would create a more powerful and resilient communications platform than what we typically have today

---

<b>So if I have poor reception on my cell phone at my house, I could still call my parents?</b>

Well, actually what might happen is that you could store what you said and they would eventually get it. But it wouldn't be real time. If the disruption lasts for an appreciable length of time, it would arrive later. But at least the information would eventually get there.