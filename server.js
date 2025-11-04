// server.js - Backend for Numble Daily Number Generation
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// Seeded random number generator (same as frontend)
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Generate daily number based on current date
function getDailyNumber(digits = 4) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    
    const seed = today.getFullYear() * 10000 + 
                 (today.getMonth() + 1) * 100 + 
                 today.getDate();
    
    let number = '';
    for (let i = 0; i < digits; i++) {
        number += Math.floor(seededRandom(seed + i) * 10);
    }
    
    return number;
}

// Get seconds until next day
function getSecondsUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return Math.floor((tomorrow - now) / 1000);
}

// API endpoint to get daily number
app.get('/api/daily-number', (req, res) => {
    const digits = parseInt(req.query.digits) || 4;
    
    if (digits < 3 || digits > 6) {
        return res.status(400).json({ 
            error: 'Digits must be between 3 and 6' 
        });
    }
    
    const dailyNumber = getDailyNumber(digits);
    const today = new Date().toISOString().split('T')[0];
    const secondsUntilNext = getSecondsUntilMidnight();
    
    res.json({
        date: today,
        number: dailyNumber,
        digits: digits,
        expiresIn: secondsUntilNext
    });
});

// API endpoint to verify a guess
app.post('/api/verify', (req, res) => {
    const { guess, digits = 4 } = req.body;
    
    if (!guess || guess.length !== digits) {
        return res.status(400).json({ 
            error: 'Invalid guess length' 
        });
    }
    
    const dailyNumber = getDailyNumber(digits);
    const result = checkGuess(guess, dailyNumber);
    
    res.json({
        correct: guess === dailyNumber,
        feedback: result
    });
});

// Check guess and return feedback
function checkGuess(guess, target) {
    const result = [];
    const targetDigits = target.split('');
    const guessDigits = guess.split('');
    const used = new Array(target.length).fill(false);

    // First pass: correct positions
    for (let i = 0; i < target.length; i++) {
        if (guessDigits[i] === targetDigits[i]) {
            result[i] = 'correct';
            used[i] = true;
        }
    }

    // Second pass: present digits
    for (let i = 0; i < target.length; i++) {
        if (result[i]) continue;
        
        const targetIndex = targetDigits.findIndex((d, idx) => 
            d === guessDigits[i] && !used[idx]
        );
        
        if (targetIndex !== -1) {
            result[i] = 'present';
            used[targetIndex] = true;
        } else {
            result[i] = 'absent';
        }
    }

    return result;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Numble API server running on port ${PORT}`);
    console.log(`Today's number: ${getDailyNumber()}`);
});

module.exports = app;
