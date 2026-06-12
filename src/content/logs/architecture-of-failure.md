---
title: 'The Architecture of Failure'
description: 'Systems do not fail at their weakest point. They fail at the point nobody thought to make weak on purpose.'
date: 2026-05-28
category: LABS
# TODO: add a real image at public/images/posts/architecture-of-failure.jpg
heroImage: '/images/posts/architecture-of-failure.jpg'
heroImageCaption: 'A fuse is the one failure you designed.'
---

Every system you have ever admired is a catalogue of failures someone decided to survive. The retry loop exists because a network call once vanished into silence. The circuit breaker exists because the retry loop, multiplied by ten thousand clients, once became the outage. We like to talk about architecture as if it were a discipline of construction. It is mostly a discipline of demolition planning.

The naive view says failure is the absence of correctness: write better code and failure recedes. But spend a year operating anything distributed and you learn that failure is not a bug class. It is a budget. Disks fail at a rate. Networks partition at a rate. Certificates expire on a schedule that always lands on a Saturday. The question is never whether the budget gets spent — only whether you chose where.

> A fuse is not a weakness in the circuit. It is the one failure you designed, placed exactly where you could afford it.

This is what I mean by the architecture of failure. Good systems are full of deliberate weak points: timeouts that give up early, queues that shed load, caches that serve stale data rather than no data. Each one is a fuse — a place where the designer said, *when the budget gets spent, spend it here.* Bad systems have no fuses. They have only surprises. They run perfectly until the day the failure finds an unplanned point of entry, and then the blast radius is everything.

## Intent does not propagate

The uncomfortable corollary is that your intentions are not part of the system. The proxy I wrote does not know I meant the connection pool to drain gracefully. It knows what the code does under memory pressure at 3 a.m. Systems do not care about intent — only consequences. The kindest thing you can do for your future self is to stop arguing about what the design *means* and start asking what it *does* when its assumptions are violated one at a time.

So I have started reviewing designs by reading them backwards. Not "how does this work?" but "how does this die?" List the deaths. Rank them by blast radius. Then place your fuses deliberately, in the cheap places, before production places them for you. The system that fails well is not the one that fails rarely. It is the one whose failures were appointments, not ambushes.
