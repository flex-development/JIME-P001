/**
 * @file Test Fixture - Apple Music API - Playlist Response
 * @module lib/services/PlaylistServices/tests/fixtures/playlist-response
 */

// @ts-expect-error incorrect type definition for Curator
export default {
  data: [
    {
      attributes: {
        artwork: {
          bgColor: '191715',
          height: 1080,
          textColor1: 'ffffff',
          textColor2: 'c6cbca',
          textColor3: 'bab7b6',
          textColor4: '9da0a0',
          url:
            'https://is4-ssl.mzstatic.com/image/thumb/Features124/v4/fd/64/f8/fd64f833-1d2d-5430-1d7f-10afbfa6213b/source/{w}x{h}SC.DN01.jpeg?l=en-US',
          width: 1080
        },
        curatorName: 'Apple Music Alternative',
        description: {
          short: 'A select mix of recent alternative hits.',
          standard:
            'A select mix of recent alternative hits. This playlist is updated often, so if you hear something you like, add it to your library.'
        },
        isChart: false,
        lastModifiedDate: '2021-03-25T23:34:52Z',
        name: 'Alternative Replay',
        playParams: {
          id: 'pl.d133de76fb4f4ccf98846231899874c0',
          kind: 'playlist'
        },
        playlistType: 'editorial',
        url:
          'https://music.apple.com/us/playlist/alternative-replay/pl.d133de76fb4f4ccf98846231899874c0'
      },
      href: '/v1/catalog/us/playlists/pl.d133de76fb4f4ccf98846231899874c0',
      id: 'pl.d133de76fb4f4ccf98846231899874c0',
      relationships: {
        curator: {
          data: [
            {
              href: '/v1/catalog/us/apple-curators/976439526',
              id: '976439526',
              type: 'apple-curators'
            }
          ],
          href:
            '/v1/catalog/us/playlists/pl.d133de76fb4f4ccf98846231899874c0/curator'
        },
        tracks: {
          data: [
            {
              attributes: {
                albumName: '404',
                artistName: 'Barns Courtney',
                artwork: {
                  bgColor: '141517',
                  height: 3000,
                  textColor1: 'f8f7f5',
                  textColor2: 'c3c4bb',
                  textColor3: 'cac9c8',
                  textColor4: 'a0a19a',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ab/94/16/ab941601-8d2b-463e-836f-33e324b4d3fc/19UMGIM19239.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Barns Courtney, Sam Battle & Josh Bruce Williams',
                discNumber: 1,
                durationInMillis: 176680,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71804597',
                name: 'You and I',
                playParams: {
                  id: '1460696931',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/62/2d/ba/622dba42-7ed6-a25c-cbb2-2eeb929dcc97/mzaf_2702916291228997783.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-10',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/you-and-i/1460696923?i=1460696931'
              },
              href: '/v1/catalog/us/songs/1460696931',
              id: '1460696931',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'A Brief Inquiry Into Online Relationships',
                artistName: 'The 1975',
                artwork: {
                  bgColor: 'fafefd',
                  height: 3000,
                  textColor1: '0b0e14',
                  textColor2: '321a0f',
                  textColor3: '3b3e43',
                  textColor4: '5a473e',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/8c/4d/0f/8c4d0f2a-c78e-cdc9-1ba8-b954e1d23a90/00602577021176.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'George Daniel, Matthew Healy, Adam Hann & Ross MacDonald',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 252926,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBK3W1800771',
                name: 'Love It If We Made It',
                playParams: {
                  id: '1435546671',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/84/cc/07/84cc075e-60e5-3e33-7df9-1f58d9ed70b8/mzaf_9100914185271671972.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-07-19',
                trackNumber: 5,
                url:
                  'https://music.apple.com/us/album/love-it-if-we-made-it/1435546528?i=1435546671'
              },
              href: '/v1/catalog/us/songs/1435546671',
              id: '1435546671',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'All the Feels',
                artistName: 'Fitz and The Tantrums',
                artwork: {
                  bgColor: 'ffffff',
                  height: 1425,
                  textColor1: '000000',
                  textColor2: '171717',
                  textColor3: '333333',
                  textColor4: '454545',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/a7/08/36/a708364b-cd67-83e9-dd45-3cad9235e085/075679848819.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Wrabel, Michael Fitzpatrick, Tommy English, Kristine Flaherty, Noelle Scaggs, James King, Joseph Karnes, Jeremy Ruzumna, John Wicks & Morgan Dorr',
                discNumber: 1,
                durationInMillis: 184642,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21901788',
                name: '123456',
                playParams: {
                  id: '1469275538',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/48/42/75/48427524-edec-1da9-6b15-efd4ad59625b/mzaf_5301018991729248758.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-20',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/123456/1469275536?i=1469275538'
              },
              href: '/v1/catalog/us/songs/1469275538',
              id: '1469275538',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Bang! - Single',
                artistName: 'AJR',
                artwork: {
                  bgColor: '060000',
                  height: 1500,
                  textColor1: 'ffad02',
                  textColor2: 'd8b380',
                  textColor3: 'cd8a02',
                  textColor4: 'ae8f67',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/5e/d6/65/5ed665ba-28b5-75c7-dc5e-d0ee58b0518d/4050538600995.jpg/{w}x{h}bb.jpeg',
                  width: 1500
                },
                composerName: 'Adam Met, Jack Met & Ryan Met',
                discNumber: 1,
                durationInMillis: 170858,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QMRSZ2000128',
                name: 'Bang!',
                playParams: {
                  id: '1496334826',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/cb/c6/3a/cbc63aa0-3b9d-2294-ba7a-98bab38b61ba/mzaf_10420379527339605889.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-12-22',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/bang/1496334825?i=1496334826'
              },
              href: '/v1/catalog/us/songs/1496334826',
              id: '1496334826',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Bank on the Funeral',
                artistName: 'Matt Maeson',
                artwork: {
                  bgColor: '215b5c',
                  height: 1425,
                  textColor1: 'e6eee6',
                  textColor2: 'cfebe4',
                  textColor3: 'bfd0ca',
                  textColor4: 'accec9',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/1b/cc/fd/1bccfdde-fa51-6622-ea14-74de4b87b8ab/075679853479.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Benjamin Berger, Matthew Mason & Ryan McMahon',
                discNumber: 1,
                durationInMillis: 227373,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21900773',
                name: 'Go Easy',
                playParams: {
                  id: '1457314245',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/cb/52/a7/cb52a733-c34d-ab2a-41e8-b94a62a93947/mzaf_1918888194661666885.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-08',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/go-easy/1457314241?i=1457314245'
              },
              href: '/v1/catalog/us/songs/1457314245',
              id: '1457314245',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Beloved - Single',
                artistName: 'Mumford & Sons',
                artwork: {
                  bgColor: 'ebe5d7',
                  height: 3000,
                  textColor1: '211024',
                  textColor2: '312830',
                  textColor3: '493b47',
                  textColor4: '564d51',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/22/9a/61/229a6156-877b-ca30-f81d-3bbad4574ca5/44003206205_1.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Winston Marshall, Marcus Mumford, Benjamin Lovett & Edward Dwane',
                discNumber: 1,
                durationInMillis: 223411,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71900605',
                name: 'Beloved',
                playParams: {
                  id: '1510321017',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/7b/36/8c/7b368c63-4c56-d94b-a127-6273de7c0521/mzaf_12728735292040416213.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-02-22',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/beloved/1510321015?i=1510321017'
              },
              href: '/v1/catalog/us/songs/1510321017',
              id: '1510321017',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Blind Leading the Blind - Single',
                artistName: 'Mumford & Sons',
                artwork: {
                  bgColor: '1c3b35',
                  height: 2000,
                  textColor1: 'fcfbf6',
                  textColor2: 'bed2cc',
                  textColor3: 'cfd4cf',
                  textColor4: '9eb4ad',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/de/26/77/de2677a4-31ef-06d3-a0ee-c32eaa963af9/44003216167_1.jpg/{w}x{h}bb.jpeg',
                  width: 2000
                },
                composerName:
                  'Marcus Mumford, Winston Marshall, Benjamin Lovett & Edward Dwane',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 224703,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71905250',
                name: 'Blind Leading the Blind',
                playParams: {
                  id: '1502264116',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/ba/55/58/ba555861-a86b-eba1-62e9-9cbdfdd93720/mzaf_6126529644209568767.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-10-21',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/blind-leading-the-blind/1502264115?i=1502264116'
              },
              href: '/v1/catalog/us/songs/1502264116',
              id: '1502264116',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Blood Harmony',
                artistName: 'FINNEAS',
                artwork: {
                  bgColor: '291515',
                  height: 3000,
                  textColor1: 'e7b19f',
                  textColor2: 'ef9849',
                  textColor3: 'c19283',
                  textColor4: 'c77e3f',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/f4/59/f1/f459f15e-f139-63c7-e075-cbbde67fa808/5054526249936_1.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'FINNEAS',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 190348,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'GBKPL1825156',
                name: "Let's Fall in Love for the Night",
                playParams: {
                  id: '1479728155',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/18/22/2f/18222fc0-1170-e496-577c-ce0cdb602da2/mzaf_10408228022981281105.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-10-19',
                trackNumber: 6,
                url:
                  'https://music.apple.com/us/album/lets-fall-in-love-for-the-night/1479728135?i=1479728155'
              },
              href: '/v1/catalog/us/songs/1479728155',
              id: '1479728155',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Borderline - Single',
                artistName: 'Tame Impala',
                artwork: {
                  bgColor: '17192e',
                  height: 4000,
                  textColor1: 'fffffd',
                  textColor2: 'b3a5d8',
                  textColor3: 'd0d0d3',
                  textColor4: '9489b6',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/58/e8/ab/58e8ab3d-13c7-4eeb-01a8-e78caf1636a4/00602577634079.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 4000
                },
                composerName: 'Kevin Parker',
                discNumber: 1,
                durationInMillis: 274294,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'AUUM71900285',
                name: 'Borderline',
                playParams: {
                  id: '1459193335',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/8a/26/87/8a268743-810e-968f-8bbf-7ce3ccc9e5c8/mzaf_6344712441554546673.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-10-27',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/borderline/1459193328?i=1459193335'
              },
              href: '/v1/catalog/us/songs/1459193335',
              id: '1459193335',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Carnival - EP',
                artistName: 'Briston Maroney',
                artwork: {
                  bgColor: '55431b',
                  height: 1425,
                  textColor1: 'e8eef2',
                  textColor2: 'd3dde5',
                  textColor3: 'cbcbc7',
                  textColor4: 'babebd',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/da/d3/91/dad391ab-5664-e35c-f645-5a3fdee0b641/075679858290.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Briston Maroney',
                discNumber: 1,
                durationInMillis: 251906,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QZBRF1882980',
                name: "Freakin' out on the Interstate",
                playParams: {
                  id: '1441691693',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/e6/00/51/e60051c9-0928-3aac-9203-1b7aa1b7a949/mzaf_8853167875967762479.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-03-23',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/freakin-out-on-the-interstate/1441691422?i=1441691693'
              },
              href: '/v1/catalog/us/songs/1441691693',
              id: '1441691693',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Caution (Radio Edit) - Single',
                artistName: 'The Killers',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3900,
                  textColor1: '110b07',
                  textColor2: '3f2712',
                  textColor3: '413c39',
                  textColor4: '665241',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/c0/49/52/c0495206-f0b4-f3c1-fa3b-aaaab274cf73/20UMGIM16909.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3900
                },
                composerName:
                  'Jonathan Rado, Shawn Everett, Brandon Flowers, Ronnie Vannucci & Alex Cameron',
                discNumber: 1,
                durationInMillis: 228040,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM72005121',
                name: 'Caution (Radio Edit)',
                playParams: {
                  id: '1502452391',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/50/5c/94/505c94ec-9c7c-cb1a-ce62-aa3fe2579827/mzaf_12368852247497570320.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-03-12',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/caution-radio-edit/1502451962?i=1502452391'
              },
              href: '/v1/catalog/us/songs/1502452391',
              id: '1502452391',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Chlorine (Alt Mix) - Single',
                artistName: 'twenty one pilots',
                artwork: {
                  bgColor: '050505',
                  height: 1425,
                  textColor1: 'f3f6f0',
                  textColor2: 'baded0',
                  textColor3: 'c4c5c1',
                  textColor4: '95b3a7',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/d5/ff/6d/d5ff6d84-e791-74a7-96e0-ecd568319747/075679853189.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Tyler Joseph',
                discNumber: 1,
                durationInMillis: 191141,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21901106',
                name: 'Chlorine (Alt Mix)',
                playParams: {
                  id: '1451482934',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/11/69/d7/1169d749-2411-bcef-2c53-068597d88797/mzaf_5452790833509704666.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-02-08',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/chlorine-alt-mix/1451482930?i=1451482934'
              },
              href: '/v1/catalog/us/songs/1451482934',
              id: '1451482934',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Cradles - Single',
                artistName: 'Sub Urban',
                artwork: {
                  bgColor: '39434c',
                  height: 3000,
                  textColor1: 'f5d182',
                  textColor2: 'f6a45d',
                  textColor3: 'cfb577',
                  textColor4: 'd09159',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/1c/e5/75/1ce57500-bc37-5233-ba66-9eb679777865/cover.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Daniel Virgil Maisonneuve',
                discNumber: 1,
                durationInMillis: 209829,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GB2LD1800949',
                name: 'Cradles',
                playParams: {
                  id: '1448038391',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/5c/28/dd/5c28dd68-a104-a7c9-cbf3-f66608a9448c/mzaf_17365371838124786573.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-01-04',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/cradles/1448038356?i=1448038391'
              },
              href: '/v1/catalog/us/songs/1448038391',
              id: '1448038391',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Delta',
                artistName: 'Mumford & Sons',
                artwork: {
                  bgColor: 'ecebd6',
                  height: 3000,
                  textColor1: '170021',
                  textColor2: '1d0c24',
                  textColor3: '412f45',
                  textColor4: '463848',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/22/f9/43/22f9435d-1ea1-2cad-972c-67cc25e0a2d4/44003199552_1.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Marcus Mumford, Winston Marshall, Benjamin Lovett & Edward Dwane',
                discNumber: 1,
                durationInMillis: 217633,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71805626',
                name: 'Guiding Light',
                playParams: {
                  id: '1510324056',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/c3/aa/a7/c3aaa79e-7da1-05fd-41eb-7759cde5a978/mzaf_12731223444191490634.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-09-20',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/guiding-light/1510323571?i=1510324056'
              },
              href: '/v1/catalog/us/songs/1510324056',
              id: '1510324056',
              type: 'songs'
            },
            {
              attributes: {
                albumName: "Don't Forget About Me, Demos - EP",
                artistName: 'Dominic Fike',
                artwork: {
                  bgColor: 'af9d93',
                  height: 3000,
                  textColor1: '000000',
                  textColor2: '211c1a',
                  textColor3: '231f1d',
                  textColor4: '3d3632',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/9e/d7/d9/9ed7d924-6f30-e515-bdaa-b0cec041f876/886447290170.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dominic Fike & Kevin "Capi" Carbo',
                discNumber: 1,
                durationInMillis: 177667,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USQX91802455',
                name: '3 Nights',
                playParams: {
                  id: '1438243871',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/cb/f0/87/cbf08762-a907-a6da-73c5-cfab00f7622f/mzaf_2751509539020852420.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-01-03',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/3-nights/1438243719?i=1438243871'
              },
              href: '/v1/catalog/us/songs/1438243871',
              id: '1438243871',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Drugstore Heaven',
                artistName: 'Houses',
                artwork: {
                  bgColor: '312a18',
                  height: 3000,
                  textColor1: 'e4c271',
                  textColor2: 'e3b23a',
                  textColor3: 'c0a45f',
                  textColor4: 'bf9733',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f6/aa/e4/f6aae450-9a14-5172-8888-ba239b421935/196006135942.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Jon Castelli, Ronald Lee Entwistle & Dexter Tortoriello',
                discNumber: 1,
                durationInMillis: 259947,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBKPL1803602',
                name: 'Fast Talk',
                playParams: {
                  id: '1554368171',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/30/61/c0/3061c00a-815b-3725-c0a6-b373ead9448a/mzaf_18143784704435019978.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-06-01',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/fast-talk/1554367975?i=1554368171'
              },
              href: '/v1/catalog/us/songs/1554368171',
              id: '1554368171',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'FEVER DREAM',
                artistName: 'Of Monsters and Men',
                artwork: {
                  bgColor: 'b7355c',
                  height: 3000,
                  textColor1: 'fcf6f3',
                  textColor2: 'fde1dd',
                  textColor3: 'eed0d5',
                  textColor4: 'efbfc3',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/f8/30/74/f8307479-0f9d-85d8-a430-b6e488344478/19UMGIM38568.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Nanna Bryndís Hilmarsdóttir & Ragnar Þórhallsson',
                discNumber: 1,
                durationInMillis: 217120,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUG11901290',
                name: 'Wars',
                playParams: {
                  id: '1461520277',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/62/49/eb/6249eb69-ab4f-59bf-ad4d-5476161b9709/mzaf_2869802049859946486.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-07-26',
                trackNumber: 9,
                url:
                  'https://music.apple.com/us/album/wars/1461520104?i=1461520277'
              },
              href: '/v1/catalog/us/songs/1461520277',
              id: '1461520277',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Falling Asleep at the Wheel - EP',
                artistName: 'Holly Humberstone',
                artwork: {
                  bgColor: 'edddcd',
                  height: 3000,
                  textColor1: '090806',
                  textColor2: '39312c',
                  textColor3: '37322e',
                  textColor4: '5d534c',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/97/1d/86/971d86d8-6b84-92c1-4f2b-d21ba1e5ead9/5060726324977.png/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Rob Milton & Holly Ffion Humberstone',
                discNumber: 1,
                durationInMillis: 203248,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'UKW522000002',
                name: 'Falling Asleep at the Wheel',
                playParams: {
                  id: '1526449291',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/b6/27/46/b6274627-a23f-4a52-f4a8-d2a2136ea0bf/mzaf_13078351262122580341.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-08-01',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/falling-asleep-at-the-wheel/1526449289?i=1526449291'
              },
              href: '/v1/catalog/us/songs/1526449291',
              id: '1526449291',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Father of the Bride',
                artistName: 'Vampire Weekend',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '020203',
                  textColor2: '0c1e46',
                  textColor3: '343535',
                  textColor4: '3d4b6b',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/c4/fa/36/c4fa36f5-eee0-8549-bb95-3c341c82ef40/886447485521.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Ezra Koenig',
                discNumber: 1,
                durationInMillis: 308413,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USSM11900111',
                name: 'Harmony Hall',
                playParams: {
                  id: '1454428982',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/a9/11/c1/a911c10d-9c32-2320-e05a-6f6b6b2067f5/mzaf_7602961371699393054.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-10',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/harmony-hall/1454428976?i=1454428982'
              },
              href: '/v1/catalog/us/songs/1454428982',
              id: '1454428982',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Father of the Bride',
                artistName: 'Vampire Weekend',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '020203',
                  textColor2: '0c1e46',
                  textColor3: '343535',
                  textColor4: '3d4b6b',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/c4/fa/36/c4fa36f5-eee0-8549-bb95-3c341c82ef40/886447485521.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Ezra Koenig, iLoveMakonnen & Mark Ronson',
                discNumber: 1,
                durationInMillis: 268600,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USSM11900141',
                name: 'This Life',
                playParams: {
                  id: '1454428984',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/4b/80/1b/4b801bdd-b9f3-a0cd-ea0c-fed8e0d7c3d1/mzaf_5720129424311352547.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-03',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/this-life/1454428976?i=1454428984'
              },
              href: '/v1/catalog/us/songs/1454428984',
              id: '1454428984',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Fever Dream',
                artistName: 'Of Monsters and Men',
                artwork: {
                  bgColor: 'b7355c',
                  height: 3000,
                  textColor1: 'fcf6f3',
                  textColor2: 'fde1dd',
                  textColor3: 'eed0d5',
                  textColor4: 'efbfc3',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/dc/c5/73/dcc573d3-1277-3659-92a4-bf4eb3d2bfaf/19UMGIM38568.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Nanna Bryndís Hilmarsdóttir',
                discNumber: 1,
                durationInMillis: 184027,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUG11901210',
                name: 'Alligator',
                playParams: {
                  id: '1472787669',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/ab/fe/cd/abfecd50-4194-0afe-82db-10627fd7a43d/mzaf_3905149301854025178.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-03',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/alligator/1472787668?i=1472787669'
              },
              href: '/v1/catalog/us/songs/1472787669',
              id: '1472787669',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Fight the Good Fight',
                artistName: 'The Interrupters',
                artwork: {
                  bgColor: 'e7e0d6',
                  height: 6000,
                  textColor1: '151515',
                  textColor2: '171715',
                  textColor3: '3f3d3b',
                  textColor4: '403f3c',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f1/1b/e3/f11be319-e9e8-237e-0483-7be8b7c5b64a/0045778053308.png/{w}x{h}bb.jpeg',
                  width: 6000
                },
                composerName:
                  'Justin Bivona, Jesse Bivona, Aimee Allen, Kevin Bivona & Tim Armstrong',
                discNumber: 1,
                durationInMillis: 170453,
                genreNames: ['Alternative', 'Music', 'Reggae', 'Rock', 'Ska'],
                hasLyrics: true,
                isrc: 'USHEL1801015',
                name: "She's Kerosene",
                playParams: {
                  id: '1485072429',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/25/f1/c5/25f1c5c8-aedb-da6a-5cb6-d623364d774f/mzaf_6504451444181483373.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-06-29',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/shes-kerosene/1485072426?i=1485072429'
              },
              href: '/v1/catalog/us/songs/1485072429',
              id: '1485072429',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Finding It Hard to Smile',
                artistName: 'lovelytheband',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '000000',
                  textColor2: '242424',
                  textColor3: '333333',
                  textColor4: '4f4f4f',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/44/44/fb/4444fb30-ad7d-08d6-270e-ef4df180cf6a/886447104675.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Christian Medice, Mitchell Collins & Samantha DeRosa',
                discNumber: 1,
                durationInMillis: 204878,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'US3DF1712109',
                name: 'Broken',
                playParams: {
                  id: '1396231367',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d4/06/b9/d406b980-48fc-26aa-272e-ddc2478018db/mzaf_7891499305753363174.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2017-07-01',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/broken/1396231359?i=1396231367'
              },
              href: '/v1/catalog/us/songs/1396231367',
              id: '1396231367',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Fuzzybrain',
                artistName: 'Dayglow',
                artwork: {
                  bgColor: 'b7ecf2',
                  height: 3000,
                  textColor1: '122126',
                  textColor2: '1a2a31',
                  textColor3: '334a4f',
                  textColor4: '395157',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/5f/50/64/5f5064aa-4e83-b304-48ef-f9d3639b2ee6/5054526793347_1.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Sloan Struble',
                discNumber: 1,
                durationInMillis: 278769,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'TCADL1825079',
                name: 'Can I Call You Tonight?',
                playParams: {
                  id: '1482950632',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/94/c4/e1/94c4e1c6-7430-8e64-edf5-82c490a5e60c/mzaf_569809842051563969.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-09-28',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/can-i-call-you-tonight/1482950619?i=1482950632'
              },
              href: '/v1/catalog/us/songs/1482950632',
              id: '1482950632',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Happier - Single',
                artistName: 'Marshmello & Bastille',
                artwork: {
                  bgColor: 'dda206',
                  height: 3000,
                  textColor1: '0d0d0b',
                  textColor2: '351c09',
                  textColor3: '372b0a',
                  textColor4: '563708',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/b1/27/57/b1275798-5a72-c74c-1421-7a58098473a8/00602567973409.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Marshmello, Dan Smith & Steve Mac',
                discNumber: 1,
                durationInMillis: 214290,
                genreNames: ['Dance', 'Music'],
                hasLyrics: true,
                isrc: 'USUG11801651',
                name: 'Happier',
                playParams: {
                  id: '1424704480',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/9c/e6/fd/9ce6fd38-1225-6ac3-f7a6-da80cb50346e/mzaf_1582186890349153418.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-01-11',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/happier/1424703172?i=1424704480'
              },
              href: '/v1/catalog/us/songs/1424704480',
              id: '1424704480',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Honey - EP',
                artistName: 'brother sundance',
                artwork: {
                  bgColor: '1a1a1a',
                  height: 1500,
                  textColor1: 'efefef',
                  textColor2: 'cdcdcd',
                  textColor3: 'c4c4c4',
                  textColor4: 'a9a9a9',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/b0/68/67/b0686714-f522-f2db-0c4a-8065d911a7be/093624904410.jpg/{w}x{h}bb.jpeg',
                  width: 1500
                },
                composerName: 'Ella Talerico, Rylan Talerico & Summer Wright',
                discNumber: 1,
                durationInMillis: 246144,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'TCADF1730626',
                name: 'Monsters',
                playParams: {
                  id: '1403969032',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/30/0a/c1/300ac144-6a93-c030-ba49-404768b8a5e6/mzaf_6107850536846324289.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2017-08-11',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/monsters/1403969025?i=1403969032'
              },
              href: '/v1/catalog/us/songs/1403969032',
              id: '1403969032',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Human Now - EP',
                artistName: 'Joshua Speers',
                artwork: {
                  bgColor: 'e1d7d5',
                  height: 3000,
                  textColor1: '0a0d16',
                  textColor2: '0b121e',
                  textColor3: '35363c',
                  textColor4: '363942',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/9b/51/b1/9b51b137-bff1-ab7d-bded-bdfcb53ee7b6/093624894261.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Andy Seltzer & Joshua Speers',
                discNumber: 1,
                durationInMillis: 212853,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QM7281805205',
                name: 'Bad Night',
                playParams: {
                  id: '1508633546',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/00/34/a9/0034a9d6-f812-2f06-e1f4-2ec9595e3489/mzaf_5713890492734178426.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-05-08',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/bad-night/1508633545?i=1508633546'
              },
              href: '/v1/catalog/us/songs/1508633546',
              id: '1508633546',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'I Am Easy to Find',
                artistName: 'The National',
                artwork: {
                  bgColor: 'ffffff',
                  height: 1400,
                  textColor1: '0e0e0c',
                  textColor2: '2a2826',
                  textColor3: '3e3e3d',
                  textColor4: '545351',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/b6/3b/f5/b63bf5e3-d035-95d5-58ca-2c6525cfa5ce/cover.jpg/{w}x{h}bb.jpeg',
                  width: 1400
                },
                composerName: 'Aaron Dessner & Thomas Bartlett',
                discNumber: 1,
                durationInMillis: 206280,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBAFL1900114',
                name: 'You Had Your Soul with You',
                playParams: {
                  id: '1453848270',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/f1/ff/04/f1ff0420-abba-d867-0a64-704697a4fc40/mzaf_3009501247686865789.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-17',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/you-had-your-soul-with-you/1453848132?i=1453848270'
              },
              href: '/v1/catalog/us/songs/1453848270',
              id: '1453848270',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'I Can Feel You Forgetting Me',
                artistName: 'Neon Trees',
                artwork: {
                  bgColor: '1e150c',
                  height: 3000,
                  textColor1: 'fa4620',
                  textColor2: 'fb360b',
                  textColor3: 'ce3c1c',
                  textColor4: 'cf300b',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/eb/0d/d6/eb0dd695-f607-543d-5202-2170c748dcaf/190296837661.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Mike Green, Niko Hartikainen & Tyler Glenn',
                discNumber: 1,
                durationInMillis: 198276,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'ZZOPM1901521',
                name: 'Used To Like',
                playParams: {
                  id: '1512431280',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/c7/b3/55/c7b355dc-0df3-0384-c0ca-a670b55af9b2/mzaf_6630005010654879962.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-11-13',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/used-to-like/1512431266?i=1512431280'
              },
              href: '/v1/catalog/us/songs/1512431280',
              id: '1512431280',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'III',
                artistName: 'The Lumineers',
                artwork: {
                  bgColor: 'f3e1af',
                  height: 1600,
                  textColor1: '0c0a09',
                  textColor2: '3a2815',
                  textColor3: '3a352a',
                  textColor4: '5f4d33',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/d4/9d/96/d49d968e-47a2-8cd4-3651-14cff1c9e841/dj.xzlimhgs.jpg/{w}x{h}bb.jpeg',
                  width: 1600
                },
                composerName: 'Wesley Schultz & Jeremiah Fraites',
                discNumber: 1,
                durationInMillis: 216120,
                genreNames: ['Alternative', 'Music', 'Singer/Songwriter'],
                hasLyrics: true,
                isrc: 'USDMG1995103',
                name: 'Gloria',
                playParams: {
                  id: '1458176613',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/85/42/d8/8542d872-2836-3e17-c9b4-7030d4bc99ab/mzaf_2342584311137240958.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-04-05',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/gloria/1458176610?i=1458176613'
              },
              href: '/v1/catalog/us/songs/1458176613',
              id: '1458176613',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'III',
                artistName: 'The Lumineers',
                artwork: {
                  bgColor: 'f3e1af',
                  height: 1600,
                  textColor1: '0c0a09',
                  textColor2: '3a2815',
                  textColor3: '3a352a',
                  textColor4: '5f4d33',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/d4/9d/96/d49d968e-47a2-8cd4-3651-14cff1c9e841/dj.xzlimhgs.jpg/{w}x{h}bb.jpeg',
                  width: 1600
                },
                composerName: 'Wesley Schultz & Jeremiah Fraites',
                discNumber: 1,
                durationInMillis: 231360,
                genreNames: ['Alternative', 'Music', 'Singer/Songwriter'],
                hasLyrics: true,
                isrc: 'USDMG1995102',
                name: 'Life in the City',
                playParams: {
                  id: '1458176612',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/85/6a/26/856a2671-3451-c9d9-522d-023b1f0ed334/mzaf_2273699598894178440.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-24',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/life-in-the-city/1458176610?i=1458176612'
              },
              href: '/v1/catalog/us/songs/1458176612',
              id: '1458176612',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Immunity',
                artistName: 'Clairo',
                artwork: {
                  bgColor: 'a7997e',
                  height: 3600,
                  textColor1: '10100d',
                  textColor2: '16120d',
                  textColor3: '2e2b23',
                  textColor4: '332d24',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/b9/66/41/b9664180-65cd-c925-bf6e-cf30dcc2b633/19UMGIM43559.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3600
                },
                composerName: 'Claire Cottrill',
                discNumber: 1,
                durationInMillis: 260520,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'US4HB1900080',
                name: 'Bags',
                playParams: {
                  id: '1465125458',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/94/cb/8f/94cb8f2a-0ab7-d5ae-6570-ecb17214ac93/mzaf_17507206176921672444.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-24',
                trackNumber: 5,
                url:
                  'https://music.apple.com/us/album/bags/1465125166?i=1465125458'
              },
              href: '/v1/catalog/us/songs/1465125458',
              id: '1465125458',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Imploding the Mirage',
                artistName: 'The Killers',
                artwork: {
                  bgColor: 'd8d2c4',
                  height: 3000,
                  textColor1: '0d0b0d',
                  textColor2: '242c31',
                  textColor3: '363332',
                  textColor4: '484d4e',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e4/49/35/e44935df-b6dd-9105-f31a-f70f6d61ccdb/20UMGIM16911.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Brandon Flowers',
                discNumber: 1,
                durationInMillis: 274453,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM72005112',
                name: "My Own Soul's Warning",
                playParams: {
                  id: '1502453953',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/25/76/ff/2576fffa-1c03-2b27-42b7-90d1a70ba1ec/mzaf_9009961114369863194.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-06-16',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/my-own-souls-warning/1502453888?i=1502453953'
              },
              href: '/v1/catalog/us/songs/1502453953',
              id: '1502453953',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Level of Concern - Single',
                artistName: 'twenty one pilots',
                artwork: {
                  bgColor: 'dad9d4',
                  height: 1425,
                  textColor1: '0b0b0c',
                  textColor2: '22211f',
                  textColor3: '343434',
                  textColor4: '474643',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/cd/a6/9d/cda69d86-c94d-b4bf-a339-dd46be5b4e4d/075679817556.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Tyler Joseph',
                discNumber: 1,
                durationInMillis: 220051,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT22002190',
                name: 'Level of Concern',
                playParams: {
                  id: '1507187886',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/3e/3b/7e/3e3b7e33-fa42-7ce8-a842-895b1207c50d/mzaf_10435836753199740831.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-04-09',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/level-of-concern/1507187367?i=1507187886'
              },
              href: '/v1/catalog/us/songs/1507187886',
              id: '1507187886',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Living Mirage',
                artistName: 'The Head and the Heart',
                artwork: {
                  bgColor: 'e8d6a4',
                  height: 1425,
                  textColor1: '0b0908',
                  textColor2: '100f0e',
                  textColor3: '373227',
                  textColor4: '3b372c',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/5c/25/a5/5c25a596-6107-7b15-137b-589ca790fdea/093624900689.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Alex Salibian, Charity Rose Thielen, Chris Zasche, Jonathan Russell, Matthew Gervais, Ryn Weaver & Tyler Williams',
                discNumber: 1,
                durationInMillis: 196055,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRE11900108',
                name: 'Honeybee',
                playParams: {
                  id: '1455367404',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/2f/7c/b7/2f7cb7c7-9fcd-58ff-7f6c-2c0f0adeaea1/mzaf_595784004329582528.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-14',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/honeybee/1455367235?i=1455367404'
              },
              href: '/v1/catalog/us/songs/1455367404',
              id: '1455367404',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Living Mirage',
                artistName: 'The Head and the Heart',
                artwork: {
                  bgColor: 'e8d6a4',
                  height: 1425,
                  textColor1: '0b0908',
                  textColor2: '100f0e',
                  textColor3: '373227',
                  textColor4: '3b372c',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/5c/25/a5/5c25a596-6107-7b15-137b-589ca790fdea/093624900689.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Charity Rose Thielen, Chris Zasche, John Hill, Jonathan Russell, Matthew Gervais, Scott Harris & Tyler Williams',
                discNumber: 1,
                durationInMillis: 195312,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRE11900111',
                name: 'Missed Connection',
                playParams: {
                  id: '1455367392',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/34/73/1b/34731bc9-67de-4bfb-717f-1c2e916b0076/mzaf_5262188825162985790.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-14',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/missed-connection/1455367235?i=1455367392'
              },
              href: '/v1/catalog/us/songs/1455367392',
              id: '1455367392',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Longshot - Single',
                artistName: 'Catfish and the Bottlemen',
                artwork: {
                  bgColor: '000000',
                  height: 3000,
                  textColor1: 'ffffff',
                  textColor2: 'd5d5d5',
                  textColor3: 'cbcbcb',
                  textColor4: 'aaaaaa',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/c9/dc/d0/c9dcd0ed-dbdd-27c8-e380-ede4363615f1/00602567909361.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Van McCann',
                discNumber: 1,
                durationInMillis: 232959,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71804352',
                name: 'Longshot',
                playParams: {
                  id: '1447051168',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/cd/0e/e3/cd0ee3f4-c22e-0ea4-51ef-e2728edc4861/mzaf_3192436497468108616.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-01-08',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/longshot/1447051167?i=1447051168'
              },
              href: '/v1/catalog/us/songs/1447051168',
              id: '1447051168',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'MELT',
                artistName: 'SHAED',
                artwork: {
                  bgColor: '0d0d0d',
                  height: 6000,
                  textColor1: 'e1e1e1',
                  textColor2: 'c4c4c4',
                  textColor3: 'b6b6b6',
                  textColor4: '9f9f9f',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/3a/92/1e/3a921eea-2378-c602-875a-942100b9043b/00842812110078.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 6000
                },
                composerName: 'Chelsea Lee, Spencer Ernst & Max Ernst',
                discNumber: 1,
                durationInMillis: 184060,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'QZ47A1800201',
                name: 'Trampoline',
                playParams: {
                  id: '1436515644',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/93/7c/36/937c363d-9099-71c3-a66c-070273c1c1a6/mzaf_2341219213485232355.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-05-18',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/trampoline/1436515209?i=1436515644'
              },
              href: '/v1/catalog/us/songs/1436515644',
              id: '1436515644',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Mariposa - Single',
                artistName: 'Peach Tree Rascals',
                artwork: {
                  bgColor: '1295f3',
                  height: 3000,
                  textColor1: '0b0204',
                  textColor2: '161516',
                  textColor3: '0d1f33',
                  textColor4: '152f42',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/1f/d5/a2/1fd5a271-aeb4-9220-ec2e-3550ea27e195/20UMGIM03504.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Dominic Joseph Pizano, Isaac Pech, Tarrek Mohammad Abdel Khaliq, Joseph Bacsafra Barros & Jasper Barros',
                discNumber: 1,
                durationInMillis: 210000,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QZFZ21934119',
                name: 'Mariposa',
                playParams: {
                  id: '1496037084',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/ba/78/7c/ba787cb6-bfad-8a5a-b3ce-fa46df53abba/mzaf_1253910793288240808.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-08-28',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/mariposa/1496037067?i=1496037084'
              },
              href: '/v1/catalog/us/songs/1496037084',
              id: '1496037084',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Mirror Master',
                artistName: 'Young the Giant',
                artwork: {
                  bgColor: '17181c',
                  height: 1425,
                  textColor1: 'e2f6f5',
                  textColor2: 'ccf1f7',
                  textColor3: 'b9caca',
                  textColor4: 'a8c5cb',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/4f/a1/2a/4fa12a04-6558-a22a-b719-5a8bf5d25155/075679864499.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Eric Cannata, Francois Comtois, Jacob Tilley, Payam Doostzadeh & Sameer Gadhia',
                discNumber: 1,
                durationInMillis: 230960,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21810822',
                name: 'Superposition',
                playParams: {
                  id: '1430224650',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/8e/a8/48/8ea848fc-4e89-0789-7c7c-a4eb855ffdf9/mzaf_14066200011071307068.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-08-21',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/superposition/1430224633?i=1430224650'
              },
              href: '/v1/catalog/us/songs/1430224650',
              id: '1430224650',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Misery - Single',
                artistName: 'Michigander',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '000000',
                  textColor2: '292929',
                  textColor3: '333333',
                  textColor4: '545454',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/9c/68/16/9c681651-c90d-ff4f-aaf0-6b81e94e18b4/859733481606_cover.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Jason Singer',
                discNumber: 1,
                durationInMillis: 180772,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'TCAEI1934930',
                name: 'Misery',
                playParams: {
                  id: '1473686295',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/bd/fb/45/bdfb45cf-d9b3-02e1-067b-d2e35fe9d5c9/mzaf_3959267109522661549.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-08-09',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/misery/1473686294?i=1473686295'
              },
              href: '/v1/catalog/us/songs/1473686295',
              id: '1473686295',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Monsters (feat. Ella Boh) - Single',
                artistName: 'brother sundance',
                artwork: {
                  bgColor: '000000',
                  height: 3000,
                  textColor1: 'f7f7f7',
                  textColor2: 'd1d1d1',
                  textColor3: 'c5c5c5',
                  textColor4: 'a7a7a7',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/50/3e/56/503e56d5-af21-61b2-fb97-485c9bccb85a/054391944801.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Alex Schwartz, Ella Talerico, Joseph Khajadourian, Rylan Talerico & Summer Wright',
                discNumber: 1,
                durationInMillis: 240157,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USWB11901128',
                name: 'Monsters (feat. Ella Boh)',
                playParams: {
                  id: '1460606184',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/14/33/ac/1433ac93-74c0-8428-fa22-e5654c29279f/mzaf_2727313165861316133.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-10',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/monsters-feat-ella-boh/1460606181?i=1460606184'
              },
              href: '/v1/catalog/us/songs/1460606184',
              id: '1460606184',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'My Honest Face - Single',
                artistName: 'Inhaler',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '050505',
                  textColor2: '202020',
                  textColor3: '373737',
                  textColor4: '4d4d4d',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/d6/1f/64/d61f64d8-b222-ab7b-faa6-0ee48dc1694b/19UM1IM04500.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Elijah Hewson, Joshua Jenkinson, Robert Keating & Ryan McMahon',
                discNumber: 1,
                durationInMillis: 274187,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBMA21860946',
                name: 'My Honest Face',
                playParams: {
                  id: '1488592583',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/b7/31/24/b731243e-a608-c5ab-317c-c675282c72e2/mzaf_5410734498058864154.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-17',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/my-honest-face/1488592355?i=1488592583'
              },
              href: '/v1/catalog/us/songs/1488592583',
              id: '1488592583',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'NINE',
                artistName: 'blink-182',
                artwork: {
                  bgColor: 'ca0f1d',
                  height: 3000,
                  textColor1: '36fefb',
                  textColor2: '58ffd4',
                  textColor3: '53cecf',
                  textColor4: '6ecfaf',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/3b/a4/76/3ba476f4-8a9b-2f8a-8e18-9f9ce7982b3f/886447823101.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Mark Hoppus, Travis Barker, Matt Skiba, Sam Hollander, Tim Pagnotta & Matt Malpass',
                discNumber: 1,
                durationInMillis: 185988,
                genreNames: ['Music', 'Rock'],
                hasLyrics: true,
                isrc: 'USSM11903330',
                name: 'Blame It on My Youth',
                playParams: {
                  id: '1473471043',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/65/a8/b2/65a8b2f2-af75-320c-3ae7-8aa68972d70a/mzaf_3249062219692448462.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-11',
                trackNumber: 5,
                url:
                  'https://music.apple.com/us/album/blame-it-on-my-youth/1473471036?i=1473471043'
              },
              href: '/v1/catalog/us/songs/1473471043',
              id: '1473471043',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Neotheater',
                artistName: 'AJR',
                artwork: {
                  bgColor: '406298',
                  height: 3000,
                  textColor1: 'ffffff',
                  textColor2: 'e7eff7',
                  textColor3: 'd8dfea',
                  textColor4: 'c6d2e4',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/84/a2/8b/84a28b37-9230-3a00-103b-2cfb3ec828db/4050538475708.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Adam Met, Jack Met & Ryan Met',
                discNumber: 1,
                durationInMillis: 212783,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QMRSZ1900002',
                name: '100 Bad Days',
                playParams: {
                  id: '1454395351',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/4c/84/71/4c847196-56fb-32a2-8365-b223143fc524/mzaf_7286428674864110473.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-12',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/100-bad-days/1454395042?i=1454395351'
              },
              href: '/v1/catalog/us/songs/1454395351',
              id: '1454395351',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'No Going Back - Single',
                artistName: 'Yuno',
                artwork: {
                  bgColor: 'fdd5cd',
                  height: 3000,
                  textColor1: '0c0c0c',
                  textColor2: '0c0c0c',
                  textColor3: '3c3432',
                  textColor4: '3c3432',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ea/09/45/ea094521-c691-b19e-c2b2-68fae1136238/Yuno_-_No_Going_Back_-_3000.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Yuno Moodie',
                discNumber: 1,
                durationInMillis: 208196,
                genreNames: ['Alternative', 'Music', 'Rock'],
                hasLyrics: true,
                isrc: 'USSUB1823602',
                name: 'No Going Back',
                playParams: {
                  id: '1346204713',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/ba/13/e5/ba13e5ca-8fc8-ac15-59f1-d3a3647555f6/mzaf_123963440092108206.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-02-21',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/no-going-back/1346204469?i=1346204713'
              },
              href: '/v1/catalog/us/songs/1346204713',
              id: '1346204713',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Norman F*****g Rockwell!',
                artistName: 'Lana Del Rey',
                artwork: {
                  bgColor: '10120f',
                  height: 3000,
                  textColor1: 'a8cee4',
                  textColor2: '86bfd4',
                  textColor3: '89a9ba',
                  textColor4: '6f9cad',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/e5/49/ae/e549ae53-352c-779c-8a24-e3fc7b50e648/19UMGIM61350.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Bradley James Nowell, Rick Rubin, Adam Keefe Horovitz, Adam Nathaniel Yauch, Marshall Raymond Goodman, Ira Gershwin, Dubose Heyward, Dorothy Heyward & George Gershwin',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 202193,
                genreNames: ['Music', 'Pop'],
                hasLyrics: true,
                isrc: 'GBUM71903894',
                name: "Doin' Time",
                playParams: {
                  id: '1474669071',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/7d/d6/d8/7dd6d815-6b35-46f8-3fe8-78f38e709d63/mzaf_6986871950112498910.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-17',
                trackNumber: 5,
                url:
                  'https://music.apple.com/us/album/doin-time/1474669063?i=1474669071'
              },
              href: '/v1/catalog/us/songs/1474669071',
              id: '1474669071',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Notes On A Conditional Form',
                artistName: 'The 1975',
                artwork: {
                  bgColor: 'eeff00',
                  height: 3000,
                  textColor1: '000100',
                  textColor2: '1c1b1c',
                  textColor3: '2f3400',
                  textColor4: '464916',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/ed/51/a5/ed51a51b-c036-7df9-dfb6-baf181b4e916/19UMGIM67710.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'George Daniel, Matthew Healy, Adam Hann & Ross MacDonald',
                discNumber: 1,
                durationInMillis: 319371,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBK3W1901077',
                name: 'If You’re Too Shy (Let Me Know)',
                playParams: {
                  id: '1473600490',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/c1/35/37/c1353781-42b8-869d-c5bf-8a54a9fdcccf/mzaf_14856433145109593713.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-04-23',
                trackNumber: 16,
                url:
                  'https://music.apple.com/us/album/if-youre-too-shy-let-me-know/1473599936?i=1473600490'
              },
              href: '/v1/catalog/us/songs/1473600490',
              id: '1473600490',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Notes On A Conditional Form',
                artistName: 'The 1975',
                artwork: {
                  bgColor: 'eeff00',
                  height: 3000,
                  textColor1: '000100',
                  textColor2: '1c1b1c',
                  textColor3: '2f3400',
                  textColor4: '464916',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/ed/51/a5/ed51a51b-c036-7df9-dfb6-baf181b4e916/19UMGIM67710.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'George Daniel, Matthew Healy, Ross MacDonald & Adam Hann',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 207223,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBK3W1901072',
                name: 'Me & You Together Song',
                playParams: {
                  id: '1473600317',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/c7/3e/3c/c73e3c44-c843-4f22-f981-b474b2f97708/mzaf_1668371904064290025.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-05-22',
                trackNumber: 11,
                url:
                  'https://music.apple.com/us/album/me-you-together-song/1473599936?i=1473600317'
              },
              href: '/v1/catalog/us/songs/1473600317',
              id: '1473600317',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Nothing Happens',
                artistName: 'Wallows',
                artwork: {
                  bgColor: 'b7bcc0',
                  height: 1425,
                  textColor1: '0b1934',
                  textColor2: '131f35',
                  textColor3: '2d3950',
                  textColor4: '343f51',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/21/98/33/2198333c-0e66-c717-9bd9-eb98054d30d8/075679859211.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Braeden Lemasters, Claire Cottrill, Cole Preston & Dylan Minnette',
                discNumber: 1,
                durationInMillis: 178000,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21812258',
                name: 'Are You Bored Yet? (feat. Clairo)',
                playParams: {
                  id: '1450670650',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/ae/8d/d1/ae8dd1a4-6247-e4be-2359-208727fe0b71/mzaf_7112277189057950080.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-22',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/are-you-bored-yet-feat-clairo/1450670646?i=1450670650'
              },
              href: '/v1/catalog/us/songs/1450670650',
              id: '1450670650',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Origins (Deluxe)',
                artistName: 'Imagine Dragons',
                artwork: {
                  bgColor: '335851',
                  height: 3000,
                  textColor1: 'fffdff',
                  textColor2: 'bcd6d7',
                  textColor3: 'd6dbdc',
                  textColor4: 'a0bcbc',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/45/09/22/4509220c-b573-636e-5599-898bf4f956c1/00602577199219.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Jorgen Odegard, Wayne Sermon, Dan Reynolds, Ben McKee, Daniel Platzman & Aja Volkman',
                discNumber: 1,
                durationInMillis: 260770,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM71816161',
                name: 'Bad Liar',
                playParams: {
                  id: '1437948987',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/64/a3/37/64a3377c-dead-8373-3f52-88f4d71797eb/mzaf_6304240886173162696.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-11-09',
                trackNumber: 5,
                url:
                  'https://music.apple.com/us/album/bad-liar/1437948883?i=1437948987'
              },
              href: '/v1/catalog/us/songs/1437948987',
              id: '1437948987',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Pep Talks',
                artistName: 'Judah & The Lion',
                artwork: {
                  bgColor: 'e1b076',
                  height: 3000,
                  textColor1: '121232',
                  textColor2: '550e10',
                  textColor3: '3b313f',
                  textColor4: '712f24',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/a0/9f/66/a09f6614-91e0-fe40-357d-062d3db0487b/19UMGIM02612.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Judah Lee Akers, Brian Victor Macdonald & Nathan Edward Zuercher',
                discNumber: 1,
                durationInMillis: 195863,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QMGSG1800003',
                name: 'Over My Head',
                playParams: {
                  id: '1474027042',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/fa/04/68/fa04687e-9a7f-aed0-d003-d55d104e9c60/mzaf_5138726912393655762.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-04',
                trackNumber: 6,
                url:
                  'https://music.apple.com/us/album/over-my-head/1474027019?i=1474027042'
              },
              href: '/v1/catalog/us/songs/1474027042',
              id: '1474027042',
              type: 'songs'
            },
            {
              attributes: {
                albumName: "Please Don't Disappear",
                artistName: 'Loud Forest',
                artwork: {
                  bgColor: 'ffffff',
                  height: 3000,
                  textColor1: '1c090e',
                  textColor2: '280c15',
                  textColor3: '4a3a3e',
                  textColor4: '533c44',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/f7/1b/aa/f71baa96-75dc-c89b-7c9b-38a5116761a7/80.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                discNumber: 1,
                durationInMillis: 192625,
                genreNames: ['Alternative', 'Indie Pop', 'Music', 'Rock'],
                hasLyrics: true,
                isrc: 'QZ8GX1700200',
                name: 'Hold On',
                playParams: {
                  id: '1451775711',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/db/7d/f5/db7df592-672a-08a5-8cd5-986a5d3fff75/mzaf_190657397557838594.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-05-04',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/hold-on/1451775693?i=1451775711'
              },
              href: '/v1/catalog/us/songs/1451775711',
              id: '1451775711',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Pony',
                artistName: 'Rex Orange County',
                artwork: {
                  bgColor: 'eaeaec',
                  height: 3000,
                  textColor1: '120805',
                  textColor2: '482d20',
                  textColor3: '3d3533',
                  textColor4: '685249',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/e3/af/48/e3af4809-2a90-38c3-c485-44ae6471f75b/886447950241.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: "Alexander O'Connor & Ben Baptie",
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 146102,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRC11902239',
                name: '10/10',
                playParams: {
                  id: '1480410839',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/35/71/4f/35714f18-29b3-7ea3-ec8b-046c77cd47a5/mzaf_8250645540720632144.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-09-12',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/10-10/1480410681?i=1480410839'
              },
              href: '/v1/catalog/us/songs/1480410839',
              id: '1480410839',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Pray for the Wicked',
                artistName: 'Panic! At the Disco',
                artwork: {
                  bgColor: 'dddcd8',
                  height: 1425,
                  textColor1: '050f0f',
                  textColor2: '27302f',
                  textColor3: '303837',
                  textColor4: '4b5251',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/82/e4/43/82e443f8-6024-f8f0-440b-7ab01164a626/075679875136.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Brendon Urie, Ilsey Juber, Jake Sinclair, Jenny Owen Youngs, Jonas Jeberg, Lauren Pritchard, Sam Hollander, Tayla Parx & William Lobbin Bean',
                discNumber: 1,
                durationInMillis: 190947,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21801185',
                name: 'High Hopes',
                playParams: {
                  id: '1361152303',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/eb/e4/2e/ebe42efd-bbce-75cd-63a2-5813637e25bb/mzaf_6529454398103897146.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-12-20',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/high-hopes/1361152002?i=1361152303'
              },
              href: '/v1/catalog/us/songs/1361152303',
              id: '1361152303',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Rattlesnake',
                artistName: 'The Strumbellas',
                artwork: {
                  bgColor: 'fbf3e0',
                  height: 3600,
                  textColor1: '000000',
                  textColor2: '141414',
                  textColor3: '32302c',
                  textColor4: '42403d',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/63/a5/39/63a53929-639d-f80b-d447-765c671111a6/5056167112235_1.jpg/{w}x{h}bb.jpeg',
                  width: 3600
                },
                composerName:
                  'Isabel Ritchie, Jeremy Drury, Darryl James, David Ritter, Jonathan Hembrey & Joanne Setterington',
                discNumber: 1,
                durationInMillis: 203667,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'CA6MD1800001',
                name: 'Salvation',
                playParams: {
                  id: '1449194032',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/6b/f5/95/6bf59572-70ca-e0bd-01ac-d194e3510dbc/mzaf_6101627500356336779.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-11-29',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/salvation/1449194023?i=1449194032'
              },
              href: '/v1/catalog/us/songs/1449194032',
              id: '1449194032',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Running Up That Hill - Single',
                artistName: 'Meg Myers',
                artwork: {
                  bgColor: 'e5dac6',
                  height: 1425,
                  textColor1: '030304',
                  textColor2: '191917',
                  textColor3: '302e2b',
                  textColor4: '41403a',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/43/71/d1/4371d1f6-6720-9468-ddf7-d49c94269830/814908027461.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                discNumber: 1,
                durationInMillis: 263717,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QMCE31902007',
                name: 'Running Up That Hill',
                playParams: {
                  id: '1452818132',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/f1/77/3c/f1773c5a-0f4a-1494-b7f6-2ad0bc681cce/mzaf_4087308205273514242.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-08',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/running-up-that-hill/1452818071?i=1452818132'
              },
              href: '/v1/catalog/us/songs/1452818132',
              id: '1452818132',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'SYML',
                artistName: 'SYML',
                artwork: {
                  bgColor: 'f1f1f1',
                  height: 2400,
                  textColor1: '030303',
                  textColor2: '282828',
                  textColor3: '323232',
                  textColor4: '505050',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/5c/69/46/5c6946e4-2f23-36dc-042a-556e2ede5c40/067003118651.jpg/{w}x{h}bb.jpeg',
                  width: 2400
                },
                composerName: 'Brian Fennell',
                discNumber: 1,
                durationInMillis: 184093,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'CAN111800259',
                name: 'Clean Eyes',
                playParams: {
                  id: '1451682289',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/4f/dc/d7/4fdcd73e-7ab9-cfb8-14f0-082ebcb9411d/mzaf_17699133085641370602.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-09-21',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/clean-eyes/1451682288?i=1451682289'
              },
              href: '/v1/catalog/us/songs/1451682289',
              id: '1451682289',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Sacred Hearts Club',
                artistName: 'Foster the People',
                artwork: {
                  bgColor: '000200',
                  height: 1500,
                  textColor1: 'f95676',
                  textColor2: 'fb305f',
                  textColor3: 'c7455e',
                  textColor4: 'c8274c',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/4a/f8/3c/4af83c2a-4913-769b-f50a-5e9010019956/886446550565.jpg/{w}x{h}bb.jpeg',
                  width: 1500
                },
                composerName:
                  'Mark Foster, Oliver Goldstein, Josh Abraham, Johnny Newman & Lars Stalfors',
                discNumber: 1,
                durationInMillis: 243147,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USSM11704909',
                name: 'Sit Next to Me',
                playParams: {
                  id: '1247002415',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview117/v4/18/83/29/188329ab-e6a6-1b11-0fe4-56fccd332957/mzaf_1776014156176153502.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2017-07-21',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/sit-next-to-me/1247002400?i=1247002415'
              },
              href: '/v1/catalog/us/songs/1247002415',
              id: '1247002415',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Shelter - Single',
                artistName: 'Broken Bells',
                artwork: {
                  bgColor: 'd8d2b8',
                  height: 2001,
                  textColor1: '2a1e30',
                  textColor2: '3e1d35',
                  textColor3: '4d424b',
                  textColor4: '5c414f',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/fb/02/e2/fb02e2c3-bf47-c9d5-3691-202894cfdc32/5056167111047_1.jpg/{w}x{h}bb.jpeg',
                  width: 2001
                },
                composerName: 'Jay Mumford, James Mercer & Brian Burton',
                discNumber: 1,
                durationInMillis: 239010,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QMEU31822092',
                name: 'Shelter',
                playParams: {
                  id: '1441953082',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/46/3b/f5/463bf51a-f369-f5a9-9dfd-82ba8cbeb96e/mzaf_4262756188232937847.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-12-07',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/shelter/1441953080?i=1441953082'
              },
              href: '/v1/catalog/us/songs/1441953082',
              id: '1441953082',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Social Cues',
                artistName: 'Cage the Elephant',
                artwork: {
                  bgColor: '006a7c',
                  height: 3000,
                  textColor1: 'f8f2e1',
                  textColor2: 'efe2f4',
                  textColor3: 'c6d7cd',
                  textColor4: 'bfcadc',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/5b/af/85/5baf85e8-901f-c347-4859-435f2d97a93f/886447488812.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Cage the Elephant',
                discNumber: 1,
                durationInMillis: 187973,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRC11803828',
                name: 'Ready to Let Go',
                playParams: {
                  id: '1450676563',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/50/31/3c/50313c05-0dca-4c55-f235-8f4ecf7a1f55/mzaf_1490039509400828124.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-02-05',
                trackNumber: 6,
                url:
                  'https://music.apple.com/us/album/ready-to-let-go/1450676554?i=1450676563'
              },
              href: '/v1/catalog/us/songs/1450676563',
              id: '1450676563',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Social Cues',
                artistName: 'Cage the Elephant',
                artwork: {
                  bgColor: '006a7c',
                  height: 3000,
                  textColor1: 'f8f2e1',
                  textColor2: 'efe2f4',
                  textColor3: 'c6d7cd',
                  textColor4: 'bfcadc',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/5b/af/85/5baf85e8-901f-c347-4859-435f2d97a93f/886447488812.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Matt Shultz, Brad Shultz, Jared Champion, Daniel Tichenor, Nick Bockrath & Matthan Minster',
                discNumber: 1,
                durationInMillis: 226533,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRC11803825',
                name: 'Black Madonna',
                playParams: {
                  id: '1450676557',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/ba/52/5f/ba525fbc-edd3-dfba-a537-57f5b811a062/mzaf_5866963418961623541.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-04-19',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/black-madonna/1450676554?i=1450676557'
              },
              href: '/v1/catalog/us/songs/1450676557',
              id: '1450676557',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Social Cues',
                artistName: 'Cage the Elephant',
                artwork: {
                  bgColor: '006a7c',
                  height: 3000,
                  textColor1: 'f8f2e1',
                  textColor2: 'efe2f4',
                  textColor3: 'c6d7cd',
                  textColor4: 'bfcadc',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/5b/af/85/5baf85e8-901f-c347-4859-435f2d97a93f/886447488812.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Matt Shultz, Brad Shultz, John Hill, Jared Champion, Daniel Tichenor, Nick Bockrath & Matthan Minster',
                discNumber: 1,
                durationInMillis: 219057,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRC11803824',
                name: 'Social Cues',
                playParams: {
                  id: '1450676556',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/99/48/3f/99483f22-75c8-3026-a006-6b30b05c109f/mzaf_1946265723050592191.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-04-19',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/social-cues/1450676554?i=1450676556'
              },
              href: '/v1/catalog/us/songs/1450676556',
              id: '1450676556',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Stella Brown - Single',
                artistName: 'Jelani Aryeh',
                artwork: {
                  bgColor: 'b2b3ad',
                  height: 1400,
                  textColor1: '101b3a',
                  textColor2: '1f293b',
                  textColor3: '303951',
                  textColor4: '3c4452',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/d6/c4/50/d6c4504c-8a33-d7cd-7c0b-1d9a47d611d9/192641459405_Cover.jpg/{w}x{h}bb.jpeg',
                  width: 1400
                },
                composerName: 'Jack Kolbe & Jelani Aryeh McCall',
                discNumber: 1,
                durationInMillis: 187415,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USA2P2010684',
                name: 'Stella Brown',
                playParams: {
                  id: '1502332216',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/e8/c1/23/e8c1239b-1793-690c-d687-87123956b485/mzaf_7832090232188399974.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-04-03',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/stella-brown/1502332215?i=1502332216'
              },
              href: '/v1/catalog/us/songs/1502332216',
              id: '1502332216',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Subject To Flooding',
                artistName: 'Jagwar Twin',
                artwork: {
                  bgColor: '272727',
                  height: 1425,
                  textColor1: '02e5e0',
                  textColor2: 'f1bfa5',
                  textColor3: '09bfbb',
                  textColor4: 'c8a18c',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music123/v4/65/80/43/65804376-be29-d793-1df8-80a4dc07aea2/075679849137.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Matthew Pauling & Roy English',
                discNumber: 1,
                durationInMillis: 175466,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21902469',
                name: 'Loser',
                playParams: {
                  id: '1459889370',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/a6/6b/7b/a66b7bd7-1349-09f5-5b4f-8da50f6e9cd3/mzaf_1601670388137657902.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-04-26',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/loser/1459889366?i=1459889370'
              },
              href: '/v1/catalog/us/songs/1459889370',
              id: '1459889370',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Take Good Care',
                artistName: 'The Revivalists',
                artwork: {
                  bgColor: '161d21',
                  height: 3000,
                  textColor1: 'ffffff',
                  textColor2: 'c6c6c6',
                  textColor3: 'd0d1d2',
                  textColor4: 'a3a4a5',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/46/b8/2b/46b82bec-f294-a208-8675-bd5ce000b4f4/00888072077591.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dave Bassett & David William Shaw',
                discNumber: 1,
                durationInMillis: 218333,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USC4R1802465',
                name: 'All My Friends',
                playParams: {
                  id: '1435380191',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/f5/95/ff/f595ff01-5d23-a7f5-b3d1-846c383b9668/mzaf_5678072780272049305.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-09-13',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/all-my-friends/1435379987?i=1435380191'
              },
              href: '/v1/catalog/us/songs/1435380191',
              id: '1435380191',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Balance',
                artistName: 'Catfish and the Bottlemen',
                artwork: {
                  bgColor: '000000',
                  height: 3600,
                  textColor1: 'f0f0f0',
                  textColor2: 'cacaca',
                  textColor3: 'c0c0c0',
                  textColor4: 'a2a2a2',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/1a/6e/c4/1a6ec47c-b374-5f58-6507-6541211578ab/00602577376009.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3600
                },
                composerName: 'Van McCann',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 188440,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71806861',
                name: '2all',
                playParams: {
                  id: '1448682267',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/69/35/e7/6935e7b7-ff58-d549-029f-31975b082e48/mzaf_3357297837139243582.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-19',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/2all/1448682255?i=1448682267'
              },
              href: '/v1/catalog/us/songs/1448682267',
              id: '1448682267',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Hearse - EP',
                artistName: 'Matt Maeson',
                artwork: {
                  bgColor: '050505',
                  height: 1425,
                  textColor1: 'ff6697',
                  textColor2: 'fb3f69',
                  textColor3: 'cc527a',
                  textColor4: 'ca3355',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/15/3d/c0/153dc0f1-d413-2091-d9df-0fbccc733abe/075679874450.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'James Flannigan & Matthew Mason',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 187173,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21801199',
                name: 'Hallucinogenics',
                playParams: {
                  id: '1374550762',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/6a/ea/4b/6aea4b8d-03e2-63c9-a64f-68c60bde7b0d/mzaf_2555668182193742717.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-03-30',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/hallucinogenics/1374550391?i=1374550762'
              },
              href: '/v1/catalog/us/songs/1374550762',
              id: '1374550762',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Hype (Alt Mix) - Single',
                artistName: 'twenty one pilots',
                artwork: {
                  bgColor: 'f9f2e8',
                  height: 1425,
                  textColor1: '0c0c0b',
                  textColor2: '1f2022',
                  textColor3: '3b3a37',
                  textColor4: '4a4a4a',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/af/be/b2/afbeb201-1cc8-5154-3cc4-9cf1f3a6fc16/075679840431.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Tyler Joseph',
                discNumber: 1,
                durationInMillis: 202750,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21904214',
                name: 'The Hype (Alt Mix)',
                playParams: {
                  id: '1473632624',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/8f/32/9a/8f329a8f-968f-c4bf-a557-aaeb88c82c82/mzaf_16825769433172232515.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-07-26',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/the-hype-alt-mix/1473632621?i=1473632624'
              },
              href: '/v1/catalog/us/songs/1473632624',
              id: '1473632624',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Kids Are Coming - EP',
                artistName: 'Tones And I',
                artwork: {
                  bgColor: 'fcffff',
                  height: 1425,
                  textColor1: '100e0e',
                  textColor2: '2b2b2b',
                  textColor3: '3f3e3e',
                  textColor4: '545555',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e4/25/0e/e4250e53-be47-a524-e951-a004d841d949/075679839237.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Toni Watson',
                discNumber: 1,
                durationInMillis: 209438,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'QZES71982312',
                name: 'Dance Monkey',
                playParams: {
                  id: '1475930045',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/59/be/f4/59bef446-a655-e94b-cd62-232c378bad75/mzaf_18358551816850900248.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-10',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/dance-monkey/1475930038?i=1475930045'
              },
              href: '/v1/catalog/us/songs/1475930045',
              id: '1475930045',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The New Abnormal',
                artistName: 'The Strokes',
                artwork: {
                  bgColor: 'c4b797',
                  height: 3000,
                  textColor1: '070507',
                  textColor2: '002634',
                  textColor3: '2d2823',
                  textColor4: '274347',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/39/36/d1/3936d1f6-c33c-29f1-31e9-079d36dc8613/886448281085.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'The Strokes, Billy Idol & Tony James',
                discNumber: 1,
                durationInMillis: 293360,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USRC11902729',
                name: 'Bad Decisions',
                playParams: {
                  id: '1498121725',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/a5/24/ca/a524caa0-a816-86f1-288e-3b03538273fc/mzaf_14343622772763745529.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-02-20',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/bad-decisions/1498121188?i=1498121725'
              },
              href: '/v1/catalog/us/songs/1498121725',
              id: '1498121725',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Slow Rush',
                artistName: 'Tame Impala',
                artwork: {
                  bgColor: '430200',
                  height: 3000,
                  textColor1: 'f2ceb1',
                  textColor2: '82d0d7',
                  textColor3: 'cfa58d',
                  textColor4: '75a7ac',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/3a/94/68/3a946811-6ab6-e0ec-1982-0b646534c35d/19UMGIM96748.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Kevin Parker',
                discNumber: 1,
                durationInMillis: 238147,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'AUUM71900933',
                name: 'Is It True',
                playParams: {
                  id: '1497231164',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/24/f3/ac/24f3ac7d-b478-3206-5c9f-c12244408433/mzaf_10523415739461974646.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-02-14',
                trackNumber: 9,
                url:
                  'https://music.apple.com/us/album/is-it-true/1497230760?i=1497231164'
              },
              href: '/v1/catalog/us/songs/1497231164',
              id: '1497231164',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'The Slow Rush',
                artistName: 'Tame Impala',
                artwork: {
                  bgColor: '430200',
                  height: 3000,
                  textColor1: 'f2ceb1',
                  textColor2: '82d0d7',
                  textColor3: 'cfa58d',
                  textColor4: '75a7ac',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/3a/94/68/3a946811-6ab6-e0ec-1982-0b646534c35d/19UMGIM96748.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Kevin Parker',
                discNumber: 1,
                durationInMillis: 249587,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'AUUM71900932',
                name: 'Lost in Yesterday',
                playParams: {
                  id: '1497231163',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/a3/bd/fb/a3bdfbbb-dc22-0e2a-f8f0-a64f1332d975/mzaf_1505939521181785458.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-01-08',
                trackNumber: 8,
                url:
                  'https://music.apple.com/us/album/lost-in-yesterday/1497230760?i=1497231163'
              },
              href: '/v1/catalog/us/songs/1497231163',
              id: '1497231163',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Thousand Peaces - EP',
                artistName: 'Absofacto',
                artwork: {
                  bgColor: '0e1a23',
                  height: 2048,
                  textColor1: 'fff9ff',
                  textColor2: 'a7bdf8',
                  textColor3: 'ceccd2',
                  textColor4: '889ccd',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a7/92/b1/a792b1e3-4393-10f4-33f0-f5dc7c9c2375/075679886729.jpg/{w}x{h}bb.jpeg',
                  width: 2048
                },
                composerName:
                  'Curtis Williams, Henry Burrell, James Varner & Jonathan Visger',
                discNumber: 1,
                durationInMillis: 224661,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21704525',
                name: 'Dissolve',
                playParams: {
                  id: '1295957306',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/a6/fe/9a/a6fe9a7d-fa4c-dd0b-d799-57fd3d1bde16/mzaf_3792435579517586677.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2017-11-03',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/dissolve/1295957247?i=1295957306'
              },
              href: '/v1/catalog/us/songs/1295957306',
              id: '1295957306',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Tickets To My Downfall',
                artistName: 'Machine Gun Kelly',
                artwork: {
                  bgColor: '06120d',
                  height: 3000,
                  textColor1: 'faf5f2',
                  textColor2: 'd29569',
                  textColor3: 'c9c7c4',
                  textColor4: 'a97b56',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/8a/8d/14/8a8d14a5-1bdd-1faf-6c3c-21c022a809d7/20UMGIM66015.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Travis Barker, Nicholas Alex Long, Colson Baker & Derek Ryan Smith',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 205159,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM72005714',
                name: 'bloody valentine',
                playParams: {
                  id: '1526411785',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/88/08/31/88083144-c812-7325-8fa4-ec40cea69c44/mzaf_6952117671522127781.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-05-01',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/bloody-valentine/1526411768?i=1526411785'
              },
              href: '/v1/catalog/us/songs/1526411785',
              id: '1526411785',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Trouble’s Coming - Single',
                artistName: 'Royal Blood',
                artwork: {
                  bgColor: '0a0404',
                  height: 4000,
                  textColor1: 'fa722b',
                  textColor2: 'ed6b2b',
                  textColor3: 'ca5c23',
                  textColor4: 'c05623',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music114/v4/89/48/1e/89481ee4-f2ce-4015-322c-e549290ca047/190295143961.jpg/{w}x{h}bb.jpeg',
                  width: 4000
                },
                composerName: 'Royal Blood & Mike Kerr',
                discNumber: 1,
                durationInMillis: 228400,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBAHT2000193',
                name: 'Trouble’s Coming',
                playParams: {
                  id: '1530573254',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/b1/09/1d/b1091da3-db53-4d0e-7bc9-50ce66093c22/mzaf_16946562006951661127.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-09-24',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/troubles-coming/1530573253?i=1530573254'
              },
              href: '/v1/catalog/us/songs/1530573254',
              id: '1530573254',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Ugly is Beautiful',
                artistName: 'Oliver Tree',
                artwork: {
                  bgColor: '3d100d',
                  height: 1425,
                  textColor1: 'f8d35f',
                  textColor2: 'f3a244',
                  textColor3: 'd2ac4e',
                  textColor4: 'cf8439',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/ad/c2/db/adc2db87-6630-d5ba-953a-5ab90f4aa431/075679828231.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Ethan Snoreck & Oliver Tree',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 145147,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21812674',
                name: 'Hurt',
                playParams: {
                  id: '1514394506',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/87/f7/5d/87f75d5d-c4c3-702c-d704-8c5f10efae27/mzaf_8508962734075146720.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-12-06',
                trackNumber: 12,
                url:
                  'https://music.apple.com/us/album/hurt/1514394064?i=1514394506'
              },
              href: '/v1/catalog/us/songs/1514394506',
              id: '1514394506',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Ugly is Beautiful',
                artistName: 'Oliver Tree',
                artwork: {
                  bgColor: '3d100d',
                  height: 1425,
                  textColor1: 'f8d35f',
                  textColor2: 'f3a244',
                  textColor3: 'd2ac4e',
                  textColor4: 'cf8439',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/ad/c2/db/adc2db87-6630-d5ba-953a-5ab90f4aa431/075679828231.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Oliver Tree, Ethan Snoreck & David Pramik',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 111210,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT22000348',
                name: 'Let Me Down',
                playParams: {
                  id: '1514394490',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/5b/2a/17/5b2a1708-0a49-5108-10e0-2713d32a24d4/mzaf_14841208688718385911.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-04-07',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/let-me-down/1514394064?i=1514394490'
              },
              href: '/v1/catalog/us/songs/1514394490',
              id: '1514394490',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Van Weezer',
                artistName: 'Weezer',
                artwork: {
                  bgColor: '370400',
                  height: 1425,
                  textColor1: 'fcfcfc',
                  textColor2: 'f502a8',
                  textColor3: 'd4cac9',
                  textColor4: 'cf0286',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/0a/16/f7/0a16f737-e901-f21f-c3b9-b88aba1936d5/075679836861.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Rivers Cuomo, Daniel Bedingfield, Dave Bassett, David Charles Marshall Biral, Denzel Michael-Akil Baptiste & Daniel Omelio',
                discNumber: 1,
                durationInMillis: 236347,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21905202',
                name: 'Hero',
                playParams: {
                  id: '1479227476',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/70/04/9e/70049e94-291a-38d8-3771-aea592bd6d23/mzaf_13648165195585609578.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-05-08',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/hero/1479227321?i=1479227476'
              },
              href: '/v1/catalog/us/songs/1479227476',
              id: '1479227476',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Visitor - Single',
                artistName: 'Of Monsters and Men',
                artwork: {
                  bgColor: '171717',
                  height: 3000,
                  textColor1: 'dfccb0',
                  textColor2: 'd0c1a8',
                  textColor3: 'b7a892',
                  textColor4: 'ab9f8b',
                  url:
                    'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ec/41/de/ec41dea6-de53-da14-11c7-9f63d588caea/20UMGIM18732.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Nanna Bryndís Hilmarsdóttir & Ragnar Þórhallsson',
                discNumber: 1,
                durationInMillis: 207227,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUG12000969',
                name: 'Visitor',
                playParams: {
                  id: '1529213010',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/a3/f5/a9/a3f5a97b-aa5a-28de-ce70-532e78563d59/mzaf_2902827780377012160.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-09-09',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/visitor/1529213009?i=1529213010'
              },
              href: '/v1/catalog/us/songs/1529213010',
              id: '1529213010',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
                artistName: 'Billie Eilish',
                artwork: {
                  bgColor: '020202',
                  height: 3000,
                  textColor1: 'eadccf',
                  textColor2: 'dcd2c4',
                  textColor3: 'bbb1a6',
                  textColor4: 'b0a89d',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/27/d3/d4/27d3d4b6-a3df-534a-74d9-75408146b46b/00602577427657.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'FINNEAS & Billie Eilish',
                discNumber: 1,
                durationInMillis: 180953,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM71810049',
                name: 'you should see me in a crown',
                playParams: {
                  id: '1450695745',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/da/25/76/da2576fe-08f7-ee5f-475f-5119b61f7a41/mzaf_7259940249221981416.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-07-20',
                trackNumber: 4,
                url:
                  'https://music.apple.com/us/album/you-should-see-me-in-a-crown/1450695723?i=1450695745'
              },
              href: '/v1/catalog/us/songs/1450695745',
              id: '1450695745',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
                artistName: 'Billie Eilish',
                artwork: {
                  bgColor: '020202',
                  height: 3000,
                  textColor1: 'eadccf',
                  textColor2: 'dcd2c4',
                  textColor3: 'bbb1a6',
                  textColor4: 'b0a89d',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/27/d3/d4/27d3d4b6-a3df-534a-74d9-75408146b46b/00602577427657.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'FINNEAS & Billie Eilish',
                discNumber: 1,
                durationInMillis: 193149,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM71900770',
                name: 'bury a friend',
                playParams: {
                  id: '1450695881',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/e0/63/8f/e0638fe6-c1a6-1dcf-c05e-242a67d12eaa/mzaf_207709894951372601.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-01-30',
                trackNumber: 10,
                url:
                  'https://music.apple.com/us/album/bury-a-friend/1450695723?i=1450695881'
              },
              href: '/v1/catalog/us/songs/1450695881',
              id: '1450695881',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
                artistName: 'Billie Eilish',
                artwork: {
                  bgColor: '020202',
                  height: 3000,
                  textColor1: 'eadccf',
                  textColor2: 'dcd2c4',
                  textColor3: 'bbb1a6',
                  textColor4: 'b0a89d',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/27/d3/d4/27d3d4b6-a3df-534a-74d9-75408146b46b/00602577427657.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'FINNEAS & Billie Eilish',
                discNumber: 1,
                durationInMillis: 194088,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM71900764',
                name: 'bad guy',
                playParams: {
                  id: '1450695739',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/5e/2f/80/5e2f8029-d77b-d097-08f5-b7ee25c57ff3/mzaf_2579071016942610640.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-29',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/bad-guy/1450695723?i=1450695739'
              },
              href: '/v1/catalog/us/songs/1450695739',
              id: '1450695739',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Wake Up, Sunshine',
                artistName: 'All Time Low',
                artwork: {
                  bgColor: '141215',
                  height: 1425,
                  textColor1: 'fed46e',
                  textColor2: 'c8c8c5',
                  textColor3: 'cfad5c',
                  textColor4: 'a4a4a2',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/25/c5/7a/25c57ad4-2fe4-b79f-b264-5b5eca53aa0c/075679829757.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Alexander Gaskarth, Jack Barakat, Andrew Goldstein, Kevin Fisher & Matthew Musto',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 174068,
                genreNames: ['Alternative', 'Music', 'Rock'],
                hasLyrics: true,
                isrc: 'USAT22000034',
                name: 'Monsters (feat. blackbear)',
                playParams: {
                  id: '1499013886',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/86/a9/f7/86a9f75f-4757-7981-7dc1-be2f9fc97a8f/mzaf_17829206080247173607.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-04-03',
                trackNumber: 7,
                url:
                  'https://music.apple.com/us/album/monsters-feat-blackbear/1499013757?i=1499013886'
              },
              href: '/v1/catalog/us/songs/1499013886',
              id: '1499013886',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Who Killed Matt Maeson - EP',
                artistName: 'Matt Maeson',
                artwork: {
                  bgColor: '060803',
                  height: 1425,
                  textColor1: 'c3d8e9',
                  textColor2: 'a1bad2',
                  textColor3: '9daebb',
                  textColor4: '8297a8',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/c1/6c/95/c16c954e-27b1-b76e-3e80-970002f5ef92/075679900579.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName: 'Matt Maeson & James Flannigan',
                discNumber: 1,
                durationInMillis: 216213,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21603313',
                name: 'Cringe',
                playParams: {
                  id: '1218944950',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/2d/16/c4/2d16c414-6a72-2b0a-2e57-1cf14247331b/mzaf_6820055957182352041.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2016-11-18',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/cringe/1218944929?i=1218944950'
              },
              href: '/v1/catalog/us/songs/1218944950',
              id: '1218944950',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Will You Be My Yellow? - EP',
                artistName: 'Bakar',
                artwork: {
                  bgColor: 'd5dee5',
                  height: 3000,
                  textColor1: '080f01',
                  textColor2: '111813',
                  textColor3: '31392e',
                  textColor4: '383f3d',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/27/30/be/2730be76-0bae-7585-0302-5fc6e2414573/886447878163.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Bakar, Andrew Boyd, Matt Schaeffer, Johnny Kosich, Jake Kosich & Lee Diamond',
                contentRating: 'explicit',
                discNumber: 1,
                durationInMillis: 213573,
                genreNames: ['Hip-Hop/Rap', 'Music'],
                hasLyrics: true,
                isrc: 'GBARL1900848',
                name: 'Hell N Back',
                playParams: {
                  id: '1478917633',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/50/64/3a/50643a3a-65fb-fd9c-3af4-4dd90e05f23d/mzaf_16493833250749497855.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-08-15',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/hell-n-back/1478917371?i=1478917633'
              },
              href: '/v1/catalog/us/songs/1478917633',
              id: '1478917633',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Women In Music Pt. III (Expanded Edition)',
                artistName: 'HAIM',
                artwork: {
                  bgColor: '100001',
                  height: 3000,
                  textColor1: 'efd9b3',
                  textColor2: 'd2ceba',
                  textColor3: 'c2ad8f',
                  textColor4: 'aba595',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/f0/48/c3/f048c3cc-26dc-e460-ab71-f8cdead3124c/886448983798.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Danielle Haim, Alana Haim, Este Haim, Rostam, Ariel Rechtshaid & Lou Reed',
                discNumber: 1,
                durationInMillis: 205027,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM71903648',
                name: 'Summer Girl (Bonus Track)',
                playParams: {
                  id: '1550175879',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/46/0a/07/460a072d-744c-9bcd-a02d-3042805c7a53/mzaf_12962808758813469278.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-07-31',
                trackNumber: 18,
                url:
                  'https://music.apple.com/us/album/summer-girl-bonus-track/1550175828?i=1550175879'
              },
              href: '/v1/catalog/us/songs/1550175879',
              id: '1550175879',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Women In Music Pt. III',
                artistName: 'HAIM',
                artwork: {
                  bgColor: '100001',
                  height: 3000,
                  textColor1: 'efd9b3',
                  textColor2: 'd2ceba',
                  textColor3: 'c2ad8f',
                  textColor4: 'aba595',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/43/df/7f/43df7f53-bad3-09eb-3c88-a256b6b40217/886448286899.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Danielle Haim, Este Haim, Alana Haim, Rostam & Ariel Rechtshaid',
                discNumber: 1,
                durationInMillis: 247600,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBUM72000497',
                name: 'The Steps',
                playParams: {
                  id: '1500345237',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/8d/8c/9b/8d8c9b24-3a06-535c-10be-c07f7de50234/mzaf_6222816688410978091.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-03-02',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/the-steps/1500345235?i=1500345237'
              },
              href: '/v1/catalog/us/songs/1500345237',
              id: '1500345237',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'You Deserve Love',
                artistName: 'White Reaper',
                artwork: {
                  bgColor: '0d0c12',
                  height: 1425,
                  textColor1: 'fffdff',
                  textColor2: '9a8bef',
                  textColor3: 'cecccf',
                  textColor4: '7d72c3',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/4f/e4/e5/4fe4e532-b242-bccf-6624-a0892c719b18/075679843753.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Anthony Esposito, nicholas wilkerson, Samuel Wilkerson, Ryan Hater & Hunter Thompson',
                discNumber: 1,
                durationInMillis: 197907,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21902771',
                name: 'Real Long Time',
                playParams: {
                  id: '1477202488',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/f3/5e/06/f35e0674-10fc-06c1-d14b-665d06cbc4ef/mzaf_12502609055518176617.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-07-24',
                trackNumber: 2,
                url:
                  'https://music.apple.com/us/album/real-long-time/1477202486?i=1477202488'
              },
              href: '/v1/catalog/us/songs/1477202488',
              id: '1477202488',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'You Deserve Love',
                artistName: 'White Reaper',
                artwork: {
                  bgColor: '0d0c12',
                  height: 1425,
                  textColor1: 'fffdff',
                  textColor2: '9a8bef',
                  textColor3: 'cecccf',
                  textColor4: '7d72c3',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/4f/e4/e5/4fe4e532-b242-bccf-6624-a0892c719b18/075679843753.jpg/{w}x{h}bb.jpeg',
                  width: 1425
                },
                composerName:
                  'Anthony Esposito, nicholas wilkerson, Samuel Wilkerson, Ryan Hater & Hunter Thompson',
                discNumber: 1,
                durationInMillis: 237013,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USAT21902764',
                name: 'Might Be Right',
                playParams: {
                  id: '1477202493',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/b8/02/83/b80283ec-d364-0e8c-ea67-eb0d7e04fec8/mzaf_5084208845476259364.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-05-29',
                trackNumber: 7,
                url:
                  'https://music.apple.com/us/album/might-be-right/1477202486?i=1477202493'
              },
              href: '/v1/catalog/us/songs/1477202493',
              id: '1477202493',
              type: 'songs'
            },
            {
              attributes: {
                albumName: "You're Somebody Else - Single",
                artistName: 'flora cash',
                artwork: {
                  bgColor: 'fcfcfc',
                  height: 1500,
                  textColor1: '000000',
                  textColor2: '171717',
                  textColor3: '323232',
                  textColor4: '454545',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/a8/43/66/a84366d8-b1b9-754c-ac5c-3ad27acf1c37/886447176092.jpg/{w}x{h}bb.jpeg',
                  width: 1500
                },
                composerName: 'Cole Randall & Shpresa Lleshaj',
                discNumber: 1,
                durationInMillis: 218883,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'SEXCG1700102',
                name: "You're Somebody Else",
                playParams: {
                  id: '1401000644',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ed/4b/b9/ed4bb972-74de-40de-86a3-68f7b8371186/mzaf_8052073296673757509.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2017-04-20',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/youre-somebody-else/1401000452?i=1401000644'
              },
              href: '/v1/catalog/us/songs/1401000644',
              id: '1401000644',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'Your Love (Déjà Vu) - Single',
                artistName: 'Glass Animals',
                artwork: {
                  bgColor: '4f4a98',
                  height: 3000,
                  textColor1: 'c2e8ed',
                  textColor2: 'bcb1f1',
                  textColor3: 'abc8db',
                  textColor4: 'a79cdf',
                  url:
                    'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/37/70/d4/3770d4d8-dcd6-a41f-b1b5-67a76e5884fa/20UMGIM02394.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dave Bayley',
                discNumber: 1,
                durationInMillis: 234372,
                genreNames: ['Alternative', 'Music', 'Pop'],
                hasLyrics: true,
                isrc: 'GBUM71905661',
                name: 'Your Love (Déjà Vu)',
                playParams: {
                  id: '1497928638',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/b8/99/c2/b899c25b-aa94-2a6b-e0b2-0695399a9c0b/mzaf_10157295388004461844.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-02-19',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/your-love-d%C3%A9j%C3%A0-vu/1497928633?i=1497928638'
              },
              href: '/v1/catalog/us/songs/1497928638',
              id: '1497928638',
              type: 'songs'
            },
            {
              attributes: {
                albumName: '"Let\'s Rock"',
                artistName: 'The Black Keys',
                artwork: {
                  bgColor: '282627',
                  height: 3000,
                  textColor1: 'f9e1e9',
                  textColor2: 'f591b5',
                  textColor3: 'cfbbc2',
                  textColor4: 'cc7c99',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/5f/a6/fa/5fa6fa9a-d174-8fe7-2438-1720d681781f/075597924961.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dan Auerbach & Patrick Carney',
                discNumber: 1,
                durationInMillis: 146597,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: false,
                isrc: 'USNO11900071',
                name: 'Go',
                playParams: {
                  id: '1459700599',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/79/97/84/79978457-962b-8e6f-2d67-28964a2e72e5/mzaf_9030261128619658632.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-06-28',
                trackNumber: 9,
                url:
                  'https://music.apple.com/us/album/go/1459700588?i=1459700599'
              },
              href: '/v1/catalog/us/songs/1459700599',
              id: '1459700599',
              type: 'songs'
            },
            {
              attributes: {
                albumName: '"Let\'s Rock"',
                artistName: 'The Black Keys',
                artwork: {
                  bgColor: '282627',
                  height: 3000,
                  textColor1: 'f9e1e9',
                  textColor2: 'f591b5',
                  textColor3: 'cfbbc2',
                  textColor4: 'cc7c99',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/5f/a6/fa/5fa6fa9a-d174-8fe7-2438-1720d681781f/075597924961.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dan Auerbach & Patrick Carney',
                discNumber: 1,
                durationInMillis: 177768,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: false,
                isrc: 'USNO11900029',
                name: 'Lo/Hi',
                playParams: {
                  id: '1459700593',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/8c/e0/77/8ce077fe-f868-6f37-0f95-dafa91b25860/mzaf_14339394696100066945.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-03-07',
                trackNumber: 3,
                url:
                  'https://music.apple.com/us/album/lo-hi/1459700588?i=1459700593'
              },
              href: '/v1/catalog/us/songs/1459700593',
              id: '1459700593',
              type: 'songs'
            },
            {
              attributes: {
                albumName: '"Let\'s Rock"',
                artistName: 'The Black Keys',
                artwork: {
                  bgColor: '282627',
                  height: 3000,
                  textColor1: 'f9e1e9',
                  textColor2: 'f591b5',
                  textColor3: 'cfbbc2',
                  textColor4: 'cc7c99',
                  url:
                    'https://is2-ssl.mzstatic.com/image/thumb/Music114/v4/5f/a6/fa/5fa6fa9a-d174-8fe7-2438-1720d681781f/075597924961.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Dan Auerbach & Patrick Carney',
                discNumber: 1,
                durationInMillis: 196777,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: false,
                isrc: 'USNO11900064',
                name: 'Shine A Little Light',
                playParams: {
                  id: '1459700589',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/1a/59/1c/1a591cc8-c138-8d9e-3e6d-04e70dd531cb/mzaf_12516571002116260395.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-06-28',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/shine-a-little-light/1459700588?i=1459700589'
              },
              href: '/v1/catalog/us/songs/1459700589',
              id: '1459700589',
              type: 'songs'
            },
            {
              attributes: {
                albumName:
                  'death bed (feat. beabadoobee) [coffee for your head] - Single',
                artistName: 'Powfu',
                artwork: {
                  bgColor: 'aba0c0',
                  height: 3000,
                  textColor1: '030302',
                  textColor2: '141a13',
                  textColor3: '242228',
                  textColor4: '323436',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/cc/a4/98/cca49806-5990-2c3f-aaa5-2a6053c9b5fd/886448289180.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Isaiah Faber, Beatrice Laus & Oscar Lang',
                discNumber: 1,
                durationInMillis: 173333,
                genreNames: ['Hip-Hop/Rap', 'Music'],
                hasLyrics: true,
                isrc: 'USSM12000925',
                name: 'death bed (feat. beabadoobee) [coffee for your head]',
                playParams: {
                  id: '1498128769',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/e6/bb/51/e6bb51b1-4066-fc3a-be3c-50a42227c7f4/mzaf_14064807224958930888.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-05-14',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/death-bed-feat-beabadoobee-coffee-for-your-head/1498128757?i=1498128769'
              },
              href: '/v1/catalog/us/songs/1498128769',
              id: '1498128769',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'everything i wanted - Single',
                artistName: 'Billie Eilish',
                artwork: {
                  bgColor: 'cfbe88',
                  height: 3000,
                  textColor1: '170206',
                  textColor2: '482125',
                  textColor3: '3c2820',
                  textColor4: '634039',
                  url:
                    'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/7a/20/ed/7a20ed64-a3e4-9726-2901-516d984e0909/19UM1IM00404.rgb.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName: 'Billie Eilish & FINNEAS',
                discNumber: 1,
                durationInMillis: 245426,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USUM71922577',
                name: 'everything i wanted',
                playParams: {
                  id: '1487502476',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/72/cf/5a/72cf5ad7-e1b3-d6ce-84b1-973d0b52d10b/mzaf_2144917941139718442.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2019-11-13',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/everything-i-wanted/1487502456?i=1487502476'
              },
              href: '/v1/catalog/us/songs/1487502476',
              id: '1487502476',
              type: 'songs'
            },
            {
              attributes: {
                albumName:
                  "how will i rest in peace if i'm buried by a highway?// - Single",
                artistName: 'KennyHoopla',
                artwork: {
                  bgColor: 'd7d6ba',
                  height: 3000,
                  textColor1: '061a0e',
                  textColor2: '0a1b12',
                  textColor3: '303f31',
                  textColor4: '334133',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music113/v4/51/53/6c/51536cbc-27d1-b60e-bd5a-be80643b9fb3/886448254584.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  "Kenneth La'Ron Beasley, Marvin Jordan & James Dring",
                discNumber: 1,
                durationInMillis: 218533,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USQX92000282',
                name: "how will i rest in peace if i'm buried by a highway?//",
                playParams: {
                  id: '1496671566',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/18/75/61/1875615d-68a5-cc19-8abb-79a85dd93f15/mzaf_12036249361638203443.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-02-04',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/how-will-i-rest-in-peace-if-im-buried-by-a-highway/1496670985?i=1496671566'
              },
              href: '/v1/catalog/us/songs/1496671566',
              id: '1496671566',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'loneliness for love - Single',
                artistName: 'lovelytheband',
                artwork: {
                  bgColor: 'eae9e5',
                  height: 3000,
                  textColor1: '0b0b1a',
                  textColor2: '422131',
                  textColor3: '373743',
                  textColor4: '644955',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/86/83/5b/86835bd1-c9dc-7453-aa60-0fa49ad6e2ad/886448236054.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Christian Medice, Mitchell Collins, Jordan Greenwald, Samuel Price, Kevin Fisher & Jaramye Daniels',
                discNumber: 1,
                durationInMillis: 237801,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'USQX91903957',
                name: 'loneliness for love',
                playParams: {
                  id: '1494545293',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview123/v4/95/c6/76/95c676a2-86e5-ed1e-0651-fd95df470b04/mzaf_15286504701999371914.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2020-07-02',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/loneliness-for-love/1494544862?i=1494545293'
              },
              href: '/v1/catalog/us/songs/1494545293',
              id: '1494545293',
              type: 'songs'
            },
            {
              attributes: {
                albumName: 'still feel. - Single',
                artistName: 'half•alive',
                artwork: {
                  bgColor: 'd6d2cf',
                  height: 3000,
                  textColor1: '201d1b',
                  textColor2: '252525',
                  textColor3: '45413f',
                  textColor4: '484747',
                  url:
                    'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/7b/0c/21/7b0c21e3-ad45-78aa-e1e2-d96e84adc7b6/886447453827.jpg/{w}x{h}bb.jpeg',
                  width: 3000
                },
                composerName:
                  'Josh Taylor, Brett Kramer, Emiko Bankson, J. Tyler Johnson, James Krausse & Rachel Kramer',
                discNumber: 1,
                durationInMillis: 247438,
                genreNames: ['Alternative', 'Music'],
                hasLyrics: true,
                isrc: 'GBKPL1814938',
                name: 'still feel.',
                playParams: {
                  id: '1444783797',
                  kind: 'song'
                },
                previews: [
                  {
                    url:
                      'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/fc/85/28/fc852850-4add-85ac-31df-f96fd3fe12c6/mzaf_4276317595448411189.plus.aac.p.m4a'
                  }
                ],
                releaseDate: '2018-08-03',
                trackNumber: 1,
                url:
                  'https://music.apple.com/us/album/still-feel/1444783793?i=1444783797'
              },
              href: '/v1/catalog/us/songs/1444783797',
              id: '1444783797',
              type: 'songs'
            }
          ],
          href:
            '/v1/catalog/us/playlists/pl.d133de76fb4f4ccf98846231899874c0/tracks'
        }
      },
      type: 'playlists'
    }
  ]
} as AppleMusicApi.PlaylistResponse
