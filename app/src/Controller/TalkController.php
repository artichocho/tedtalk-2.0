<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class TalkController extends AbstractController
{
    public function __construct(
        #[Autowire('%site_base_path%')]
        private readonly string $siteBasePath,
    ) {
    }
    #[Route(path: '/', name: 'talk_home')]
    public function home(): Response
    {
        return $this->render('talk/home.html.twig', $this->buildView());
    }

    #[Route(path: '/intervenante', name: 'talk_speaker')]
    public function speaker(): Response
    {
        return $this->render('talk/speaker.html.twig', $this->buildView());
    }

    #[Route(path: '/programme', name: 'talk_schedule')]
    public function schedule(): Response
    {
        return $this->render('talk/schedule.html.twig', $this->buildView());
    }

    #[Route(path: '/billetterie', name: 'talk_tickets')]
    public function tickets(): Response
    {
        return $this->render('talk/tickets.html.twig', $this->buildView());
    }

    #[Route(path: '/statistiques', name: 'talk_stats')]
    public function stats(): Response
    {
        return $this->render('talk/stats.html.twig', $this->buildView());
    }

    #[Route(path: '/a-propos', name: 'talk_about')]
    public function about(): Response
    {
        return $this->render('talk/about.html.twig', $this->buildView());
    }

    #[Route(path: '/vip', name: 'talk_vip')]
    public function vip(): Response
    {
        return $this->render('talk/vip.html.twig', $this->buildView());
    }

    private function buildView(): array
    {
        $base = rtrim($this->siteBasePath, '/');
        $path = fn (string $route, array $parameters = []): string => $base.$this->generateUrl($route, $parameters, UrlGeneratorInterface::ABSOLUTE_PATH);

        return [
            'locale' => 'fr',
            'content' => $this->content(),
            'nav' => [
                'home' => $path('talk_home'),
                'speaker' => $path('talk_speaker'),
                'schedule' => $path('talk_schedule'),
                'tickets' => $path('talk_tickets'),
                'stats' => $path('talk_stats'),
                'about' => $path('talk_about'),
                'vip' => $path('talk_vip'),
            ],
        ];
    }

    private function content(): array
    {
        return [
            'brand' => 'TEDxGrand Hall',
            'title' => 'L\'Art du Cunni-Linguistique',
            'subtitle' => 'Une conférence très professionnelle sur le cunnilingus : consentement, communication et précision millimétrée.',
            'date' => '26 mars 2026',
            'location' => 'Grand Hall, Institut de l\'Innovation Prétentieuse',
            'speaker' => 'Irène Clitwell, PhD (Dynamiques intimes et rhétorique scénique)',
            'speaker_bio' => 'Experte en pédagogie sensible, elle transforme les sujets qui font rougir en idées qui font grandir.',
            'agenda' => [
                'Cadre de confiance : sans consentement, il n\'y a pas de conférence',
                'Technique bucco-nomique : rythme, respiration et ergonomie linguale',
                'Boucles de retour : écouter les signaux sans perdre le fil... ni la langue',
                'Safe sex oral : digue dentaire, hygiène, dépistage et humour bien placé',
                'After-care : conclure avec attention, pas avec précipitation',
            ],
            'tickets' => [
                [
                    'name' => 'Pass Échauffement',
                    'price' => '29€',
                    'tagline' => 'Pour se mettre en bouche',
                    'perks' => [
                        'Accès à la salle',
                        'Replay 7 jours',
                        'Guide PDF "Consentement express"',
                    ],
                    'billet_url' => 'https://www.youtube.com/watch?v=nLTgWdXrx3U',
                ],
                [
                    'name' => 'Pass Grand Oral',
                    'price' => '69€',
                    'tagline' => 'Le best-seller qui a la langue bien pendue',
                    'perks' => [
                        'Place prioritaire',
                        'Q&A privée',
                        'Kit "safe oral" symbolique (fictif)',
                    ],
                    'highlight' => true,
                    'billet_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ',
                ],
                [
                    'name' => 'Pass Standing Ovulation',
                    'price' => '149€',
                    'tagline' => 'Quand le professionnalisme prend le micro',
                    'perks' => [
                        'Cocktail de clôture',
                        'Photo de groupe',
                        'Tote bag "Je lèche donc je suis"',
                    ],
                    'billet_url' => 'https://fr.wikipedia.org/wiki/Standing_ovation',
                ],
            ],
            'faq_title' => 'Questions fréquentes',
            'faq_1' => 'Oui, le ton est satirique. Non, la bienveillance n\'est pas optionnelle.',
            'faq_2' => 'Message central : communication claire, consentement explicite, attention continue.',
            'hint' => 'Astuce : Shift + T révèle un secret. Le code Konami en révèle un second.',
            'nav_labels' => ['Accueil', 'Intervenante', 'Programme', 'Billetterie', 'Statistiques', 'À propos'],
            'cta' => 'Voir le programme',
            'footer' => 'TEDx Grand Hall 2026 - Des idées qui donnent la langue bien pendue.',
            'consent_block_title' => 'Consentement et safe sex : non négociables',
            'consent_points' => [
                'Le consentement se demande, se confirme et se respecte, du premier mot à la dernière minute.',
                'Le safe sex oral existe : protections adaptées (digue dentaire), hygiène, et dépistage régulier.',
                'Règle d\'or : si l\'une des deux personnes n\'est pas à l\'aise, on fait une pause. Pas de débat, juste du respect.',
            ],
            'vip_title' => 'Espace VIP',
            'vip_desc' => 'Zone confidentielle réservée aux visiteurs qui lisent vraiment les petits caractères.',
            'vip_button' => 'Valider mon badge',
            'vip_result' => 'Accès accordé : votre professionnalisme est certifié ISO 69-420.',
            'about_title' => 'À propos de cette conférence',
            'about_text' => 'Format premium, fond espiègle : ici, on traite un sujet intime avec sérieux, humour et précision.',
            'stats' => [
                'labels' => ['Clarté des consignes', 'Rythme', 'Communication', 'Confort', 'Applaudimètre'],
                'satisfaction' => [94, 88, 97, 91, 99],
                'sessions' => [
                    ['mois' => 'Jan', 'score' => 62],
                    ['mois' => 'Fév', 'score' => 71],
                    ['mois' => 'Mar', 'score' => 76],
                    ['mois' => 'Avr', 'score' => 89],
                    ['mois' => 'Mai', 'score' => 93],
                    ['mois' => 'Juin', 'score' => 98],
                ],
                'safe_practices' => [
                    ['pratique' => 'Discussion préalable', 'score' => 96],
                    ['pratique' => 'Consentement verbal clair', 'score' => 99],
                    ['pratique' => 'Protection orale utilisée', 'score' => 68],
                    ['pratique' => 'Check-in pendant l acte', 'score' => 91],
                    ['pratique' => 'After-care', 'score' => 88],
                ],
                'repartition' => [
                    'Très à l\'aise' => 41,
                    'Curieux mais concentrés' => 33,
                    'Prudentement enthousiastes' => 21,
                    'Rougissent en silence' => 5,
                ],
                'kpis' => [
                    ['label' => 'Taux de sourires complices', 'value' => '92%'],
                    ['label' => 'Niveau moyen de gêne productive', 'value' => '7.8/10'],
                    ['label' => 'Indice de "oh, c\'est logique en fait"', 'value' => '96%'],
                    ['label' => 'Décibels d\'applaudissements', 'value' => '104 dB'],
                ],
            ],
        ];
    }
}
