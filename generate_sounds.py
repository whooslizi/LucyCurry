import math
import struct
import wave
import os

def save_wav(filename, samples, sample_rate=44100):
    os.makedirs('public/sounds', exist_ok=True)
    path = os.path.join('public', 'sounds', filename)
    with wave.open(path, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        for s in samples:
            # clamp
            s = max(-1.0, min(1.0, s))
            value = int(s * 32767.0)
            data = struct.pack('<h', value)
            wav_file.writeframesraw(data)
    print(f"Generated {path}")

def generate_notification():
    sr = 44100
    duration = 0.5
    samples = []
    # Ting (1000Hz) - Ting (1300Hz)
    for i in range(int(sr * duration)):
        t = i / sr
        freq = 1000 if t < 0.2 else 1300
        env = max(0, 1 - (t % 0.25) / 0.25) if t < 0.4 else 0
        s = math.sin(2 * math.pi * freq * t) * env * 0.5
        samples.append(s)
    save_wav('notification.wav', samples)

def generate_yasss():
    sr = 44100
    duration = 1.0
    samples = []
    # Rising frequency chord
    for i in range(int(sr * duration)):
        t = i / sr
        freq1 = 440 + t * 400
        freq2 = 554 + t * 400
        freq3 = 659 + t * 400
        env = max(0, 1 - t/duration)
        s = (math.sin(2*math.pi*freq1*t) + math.sin(2*math.pi*freq2*t) + math.sin(2*math.pi*freq3*t)) / 3.0
        samples.append(s * env * 0.8)
    save_wav('YASSS.wav', samples)

def generate_cash():
    sr = 44100
    duration = 0.3
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        freq = 2000 - (t * 2000)
        env = max(0, 1 - t/duration)
        s = math.sin(2 * math.pi * freq * t) * env * 0.3
        # Add noise
        noise = (math.sin(10000 * t) * 0.5)
        samples.append((s + noise) * env)
    save_wav('cash.wav', samples)

def generate_error():
    sr = 44100
    duration = 0.4
    samples = []
    for i in range(int(sr * duration)):
        t = i / sr
        freq = 150
        env = 1 if t < 0.3 else 0
        # square wave for buzzer
        s = 0.5 if math.sin(2 * math.pi * freq * t) > 0 else -0.5
        samples.append(s * env * 0.5)
    save_wav('error.wav', samples)

def generate_bgm():
    sr = 44100
    duration = 4.0
    samples = []
    # Simple repeating bass line
    notes = [220, 220, 261.63, 293.66, 220, 220, 196, 196]
    for i in range(int(sr * duration)):
        t = i / sr
        note_idx = int((t / duration) * len(notes))
        freq = notes[note_idx]
        t_note = t % (duration / len(notes))
        env = max(0, 1 - t_note / (duration / len(notes)))
        s = math.sin(2 * math.pi * freq * t_note) * env * 0.2
        samples.append(s)
    save_wav('bgm.wav', samples)

generate_notification()
generate_yasss()
generate_cash()
generate_error()
generate_bgm()
