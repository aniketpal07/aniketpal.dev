---
title: 'Flow State'
description: 'Flow is not a mood. It is a systems property — and like any systems property, it can be engineered.'
date: 2026-06-02
category: THOUGHTS
---

We talk about flow as if it were weather — something that arrives, blesses an afternoon, and leaves without explanation. Four hours pass like one, the code pours out, and we credit inspiration. I have stopped believing in the weather theory. Flow looks much less like a mood and much more like a well-tuned feedback loop, and feedback loops have knobs.

Consider what flow actually requires. Clear goals: you always know the next action. Immediate feedback: the system tells you quickly whether the action worked. Matched difficulty: the task sits just past the edge of comfort. Csikszentmihalyi catalogued these as psychology. But read them as an engineer and they describe a control system — a tight loop between intent, action, and signal, with latency low enough that the loop never stalls.

> Flow is what a mind feels like when its feedback loop has low latency and a clean signal. Everything else is implementation detail.

This reframing matters because it converts a mystery into an engineering problem. If flow is a loop, then everything that breaks flow is loop degradation, and you can name the failure modes precisely. A slow compile is feedback latency. A flaky test suite is signal noise — the loop returns data you cannot trust. An ambiguous ticket is a missing setpoint; the controller has nothing to steer toward. Slack notifications are interrupt storms, each one a context switch that flushes the cache you spent forty minutes warming.

So I treat my working environment the way I would treat a latency-sensitive service. Measure the loop first: how long from "I made a change" to "I know if it worked"? If the answer is minutes, no meditation app will save you; fix the build. Reduce noise next — quarantine the flaky tests, mute the channels, make the signal mean something again. Then set the difficulty deliberately, the way you would set a target utilization: too low and the loop is boring, too high and it thrashes.

None of this guarantees the state. Biology keeps its own counsel, and some days the loop is perfect and the mind still will not settle. But the asymmetry is real: you cannot summon flow, and you can absolutely make it impossible. Most environments do, by accident, every day. The work is removing the accidents — and then the weather turns out to be climate after all.
