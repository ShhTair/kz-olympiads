# Database Statistics

## Overview
Comprehensive database of International Olympiad participants from CIS and Central Asia countries.

## Coverage

### Countries (10)
- 🇰🇿 Kazakhstan (KAZ)
- 🇺🇿 Uzbekistan (UZB)
- 🇰🇬 Kyrgyzstan (KGZ)
- 🇹🇯 Tajikistan (TJK)
- 🇹🇲 Turkmenistan (TKM)
- 🇷🇺 Russia (RUS)
- 🇧🇾 Belarus (BLR)
- 🇦🇲 Armenia (ARM)
- 🇦🇿 Azerbaijan (AZE)
- 🇲🇩 Moldova (MDA)

### Olympiads with Data (13)

#### International (I-prefix)
1. **IMO** - International Mathematical Olympiad
   - Data: 10 countries
   - Participants: ~2000
   - Status: Expanded

2. **IOI** - International Olympiad in Informatics
   - Data: 8 countries
   - Participants: ~850
   - Status: Expanded

3. **IPhO** - International Physics Olympiad
   - Data: 3 countries
   - Participants: ~720
   - Status: Partial

4. **IChO** - International Chemistry Olympiad
   - Data: 5 countries
   - Participants: ~860
   - Status: Partial

5. **IBO** - International Biology Olympiad
   - Data: 5 countries
   - Participants: ~844
   - Status: Partial

6. **IOL** - International Linguistics Olympiad
   - Data: 4 countries
   - Participants: ~434
   - Status: Partial

7. **IAO** - International Astronomy Olympiad
   - Data: 5 countries
   - Participants: ~905
   - Status: Partial

8. **IGeO** - International Geography Olympiad
   - Data: 4 countries
   - Participants: ~380
   - Status: Partial

9. **IESO** - International Earth Science Olympiad
   - Data: 4 countries
   - Participants: ~472
   - Status: Partial

10. **IJSO** - International Junior Science Olympiad
    - Data: 5 countries
    - Participants: ~654
    - Status: Partial

#### Regional
11. **APMO** - Asian Pacific Mathematics Olympiad
    - Data: 5 countries
    - Participants: ~1982
    - Status: Partial

12. **Zhautykov Olympiad** (Kazakhstan-based)
    - Data: 3 countries
    - Participants: ~1220
    - Status: Expanded

### Total Statistics

**Participants Documented:** ~11,000+
**Gold Medals:** ~1,200+
**Silver Medals:** ~1,800+
**Bronze Medals:** ~1,600+
**Honorable Mentions:** ~800+

### Data Quality Levels

- **Expanded:** Full details with names, medals, years, leaders
- **Partial:** Statistics, some notable participants
- **Basic:** Medal counts, participation years

### Notable Olympians Documented (50+)

**Kazakhstan:**
- Kuat Yessenov (IMO 2x Gold)
- Kanat Satylkhanov (IMO Gold, later leader)
- Zhomart Sadykov (IOI Gold 2007)
- Batyr Sardarbekov (IOI Gold 2019)
- Many more...

**Russia:**
- Grigory Perelman (IMO perfect score, Fields Medal)
- Gennady Korotkevich (IOI 6-time, perfect 600)
- Petr Mitrichev (IOI 3x Gold)
- Many more...

**Belarus:**
- Petr Mitrichev (IOI 3x Gold)
- Gennady Korotkevich (IOI/IMO)

**Armenia:**
- Davit Khachatryan (IMO 2x Gold)

**Uzbekistan:**
- Multiple silver/bronze medalists

### Data Sources
- Official IMO website (imo-official.org)
- Official IOI statistics (stats.ioinformatics.org)
- Official IPhO, IChO, IBO, IOL websites
- Regional olympiad archives
- Historical records

### Update Frequency
- Last updated: February 2026
- Ongoing expansion

### Coverage Goals
- [ ] Complete all 10 countries for IMO/IOI
- [ ] Add IPhO full data
- [ ] Expand regional olympiads
- [ ] Add student photos/profiles (when available)
- [ ] Historical trends and analytics

## Files Structure

```
data/
├── countries.json              # Country metadata
├── olympiads-list.json         # All olympiads catalog
├── imo-countries.json          # IMO data (10 countries)
├── ioi-countries.json          # IOI data (8 countries)
├── ipho-countries.json         # IPhO data (3 countries)
├── icho-countries.json         # IChO data (5 countries)
├── ibo-countries.json          # IBO data (5 countries)
├── iol-countries.json          # IOL data (4 countries)
├── iao-countries.json          # IAO data (5 countries)
├── igeo-countries.json         # IGeO data (4 countries)
├── ieso-countries.json         # IESO data (4 countries)
├── ijso-countries.json         # IJSO data (5 countries)
├── apmo-countries.json         # APMO data (5 countries)
└── zhautykov-countries.json    # Zhautykov data (3 countries)
```

## Version History

- **v2.4** - Added 5 olympiads (IChO, IBO, IOL, APMO, IOI Belarus)
- **v2.3** - Massive data expansion (Uzbekistan, Russia legends, IPhO)
- **v2.2** - Premium design upgrade
- **v2.1** - Expanded olympiad list to 34
- **v2.0** - Multi-country support (10 countries)
- **v1.2** - Interactive pages
- **v1.1** - IOI Kazakhstan
- **v1.0** - Initial launch (Kazakhstan IMO)
